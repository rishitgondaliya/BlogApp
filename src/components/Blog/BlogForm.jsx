/* eslint-disable react/prop-types */

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Button, Input, Select, RTE } from '../index';
import appwriteService from '../../appwrite/appwriteService';
import uploadService from '../../appwrite/fileUpload';

function BlogForm({ blog }) {
    const { register, handleSubmit, control, getValues } = useForm({
        defaultValues: {
            title: blog?.title || '',
            content: blog?.content || '',
            status: blog?.status || 'active',
        },
    });

    const [imagePreview, setImagePreview] = useState(null); // State for image preview
    const navigate = useNavigate();
    const userData = useSelector((state) => state.auth.userData);

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const previewUrl = URL.createObjectURL(file);
            setImagePreview(previewUrl); // Set the image preview
        }
    };

    const submit = async (data) => {
        try {
            let fileUrl = null;

            // Check if an image is selected and upload it
            if (data.image && data.image.length > 0) {
                fileUrl = await uploadService.uploadFile(data.image[0]);
                console.log('Uploaded image URL:', fileUrl);
            } else {
                console.warn('No image uploaded');
            }

            if (blog) {
                // If updating, delete the old image if a new one is uploaded
                if (fileUrl && blog.blogImage) {
                    await uploadService.deleteFile(blog.blogImage);
                }

                const updatedBlogData = {
                    ...data,
                    blogImage: fileUrl ? fileUrl.$id : blog.blogImage,
                };

                const dbBlog = await appwriteService.updateBlog(blog.$id, updatedBlogData);

                if (dbBlog) {
                    navigate(`/blog/${blog.$id}`);
                }
            } else {
                // Creating a new blog
                if (fileUrl) {
                    const newBlogData = {
                        ...data,
                        blogImage: fileUrl.$id,
                        userId: userData.$id,
                    };

                    console.log('Creating new blog with data:', newBlogData);
                    const dbBlog = await appwriteService.createBlog(newBlogData);
                    if (dbBlog) {
                        navigate(`/blog/${dbBlog.$id}`);
                    }
                }
            }
        } catch (error) {
            console.error('Error while submitting:', error);
        }
    };

    return (
        <form onSubmit={handleSubmit(submit)} className="flex flex-wrap">
            <div className="w-2/3 px-6">
                <div className="mb-4">
                    <label className="block text-base font-medium text-gray-700">Title :</label>
                    <Input
                        label="Title"
                        placeholder="Enter blog title"
                        className="mb-4"
                        {...register('title', { required: true })}
                    />
                </div>

                <div className="mb-4">
                    <label className="block text-base font-medium text-gray-700 mb-4">Content :</label>
                    <RTE
                        name="content"
                        control={control}
                        defaultValue={getValues('content')}
                    />
                </div>
            </div>

            <div className="w-1/3 px-6">
                <div className="mb-4">
                    <label className="block text-base font-medium text-gray-700">Blog Image :</label>
                    <Input
                        type="file"
                        className="mb-4"
                        accept="image/png, image/jpg, image/jpeg, image/gif, image/webp"
                        {...register('image', { required: !blog })}
                        onChange={handleImageChange} // Handle image selection for preview
                    />
                    {/* Show image preview */}
                    {imagePreview && (
                        <div className="w-full mb-4">
                            <img
                                src={imagePreview}
                                alt="Image Preview"
                                className="rounded-lg"
                            />
                        </div>
                    )}
                    {/* Show blog image when editing */}
                    {blog && blog.blogImage && !imagePreview && (
                        <div className="w-fit mb-4 mx-auto">
                            <img
                                src={uploadService.getFilePreview(blog.blogImage)}
                                alt={blog.title}
                                className="rounded-lg max-h-72"
                            />
                        </div>
                    )}
                </div>

                <div className="mb-4">
                    <label className="block text-base font-medium text-gray-700 mb-4">Status :</label>
                    <Select
                        options={['active', 'inactive']}
                        label="Status"
                        className="mb-4"
                        {...register('status', { required: true })}
                    />
                </div>
                <div className="flex justify-center pt-4">
                    <Button
                        type="submit"
                        size="large"
                        className={'w-full font-semibold'}
                        paddingX={2}
                        paddingY={0.5}
                        fontSize='1rem'
                        textColor='white'
                        bgColor={blog ? '#52f752' : '#de47f5'}
                    >
                        {blog ? 'Update' : 'Submit'}
                    </Button>
                </div>
            </div>
        </form>
    );
}

export default BlogForm;
