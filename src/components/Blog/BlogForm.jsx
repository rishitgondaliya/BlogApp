/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { useCallback, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { Button, Input, Select, RTE } from '../index'
import appwriteService from '../../appwrite/appwriteService'
import uploadService from '../../appwrite/fileUpload'
import noImage from '../../assets/no_image.jpg'

function BlogForm({ blog }) {
    const { register, handleSubmit, watch, setValue, control, getValues } = useForm({
        defaultValues: {
            title: blog?.title || '',
            content: blog?.content || '',
            slug: blog?.slug || '',
            status: blog?.status || 'active'
        }
    })

    const navigate = useNavigate()
    const userData = useSelector(state => state.auth.userData)

    const submit = async (data) => {
        try {
            let fileUrl = null;
    
            // Check if an image is selected and upload it
            if (data.image && data.image.length > 0) {
                fileUrl = await uploadService.uploadBlogImage(data.image[0]);
                console.log("Uploaded image URL:", fileUrl);  // Log the uploaded file URL
            } else {
                console.warn("No image uploaded");
            }
    
            // If no image is uploaded for a new blog, prevent submission
            if (!fileUrl && !blog) {
                console.error("No image uploaded for new blog.");
                return; // Prevent submission if no image is uploaded for a new blog
            }
    
            // Set blogImage, default to the existing blog image if updating
            const blogImage = fileUrl || (blog ? blog.blogImg : null);
    
            // Ensure blogImage is defined before submission
            if (!blogImage) {
                console.error("Missing blogImage URL:", blogImage);
                return; // Prevent submission if blogImage is not set
            }
    
            if (blog) {
                // If updating, delete the old image if a new one is uploaded
                if (fileUrl && blog.blogImg) {
                    await uploadService.deleteBlogImage(blog.blogImg);
                }
    
                const updatedBlogData = {
                    ...data,
                    blogImage,  // Use the correct blog image URL
                };
    
                const dbBlog = await appwriteService.updateBlog(blog.$id, updatedBlogData);
    
                if (dbBlog) {
                    navigate(`/blog/${blog.$id}`);  // Navigate to the updated blog post
                }
            } else {
                // Creating a new blog
                const newBlogData = {
                    ...data,
                    blogImage,  // Use the uploaded blog image URL
                    userId: userData.$id,  // Ensure the userId is added for new blogs
                };
    
                console.log("Creating new blog with data:", newBlogData);  // Log the data being sent
                const dbBlog = await appwriteService.createBlog(newBlogData);
                if (dbBlog) {
                    navigate(`/post/${dbBlog.$id}`);  // Navigate to the newly created blog post
                }
            }
        } catch (error) {
            console.error("Error while submitting:", error);
        }
    };
    

    const slugTransform = useCallback((value) => {
        if (value && typeof value === 'string') {
            return value
                .trim()
                .toLowerCase()
                .replace(/[^a-zA-Z\d]+/g, "-");
        }
        return '';
    }, []);

    useEffect(() => {
        const subscription = watch((value, { name }) => {
            if (name === 'title') {
                setValue('slug', slugTransform(value.title, {
                    shouldValidate: true
                }))
            }
        })

        return () => {
            subscription.unsubscribe()
        }
    }, [watch, slugTransform, setValue])

    return (
        <form onSubmit={handleSubmit(submit)} className="flex flex-wrap">
            <div className="w-2/3 px-2">
                <Input
                    label="Title :"
                    placeholder="Title"
                    className="mb-4"
                    {...register("title", { required: true })}
                />
                <Input
                    label="Slug :"
                    placeholder="Slug"
                    className="mb-4"
                    {...register("slug", { required: true })}
                    onInput={(e) => {
                        setValue("slug", slugTransform(e.currentTarget.value), { shouldValidate: true });
                    }}
                />
                <RTE
                    label="Content :"
                    name="content"
                    control={control}
                    defaultValue={getValues("content")}
                />
            </div>
            <div className="w-1/3 px-2">
                <Input
                    label="Featured Image :"
                    type="file"
                    className="mb-4"
                    accept="image/png, image/jpg, image/jpeg, image/gif, image/webp"
                    {...register("image", { required: !blog })}
                />
                {blog && blog.blogImg && (
                    <div className="w-full mb-4">
                        <img
                            src={uploadService.getFilePreview(blog.blogImg)}
                            alt={blog.title}
                            className="rounded-lg"
                        />
                    </div>
                )}
                <Select
                    options={["active", "inactive"]}
                    label="Status"
                    className="mb-4"
                    {...register("status", { required: true })}
                />
                <Button type="submit" bgColor={blog ? "bg-green-500" : undefined} className="w-full">
                    {blog ? "Update" : "Submit"}
                </Button>
            </div>
        </form>
    )
}

export default BlogForm