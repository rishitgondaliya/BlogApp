import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { Button, Container } from "../components";
import parse from "html-react-parser";
import appwriteService from "../appwrite/appwriteService";
import uploadService from "../appwrite/fileUpload";

export default function BlogPage() {
  const [blog, setBlog] = useState(null);
  const { slug } = useParams();
  const navigate = useNavigate();

  const userData = useSelector((state) => state.auth.userData);

  const isAuthor = blog && userData ? blog.userId === userData.$id : false;

  useEffect(() => {
    if (slug) {
      appwriteService.getBlog(slug)
        .then((blog) => {
          if (blog) setBlog(blog);
          else navigate("/");
        });
    } else navigate("/");
  }, [slug, navigate]);

  useEffect(() => {
    console.log("blog Author ID:", blog?.userId);
    console.log("Current User ID:", userData?.$id);
    console.log("Is Author:", isAuthor);
    console.log("blog data:", blog)
  })

  const deleteblog = () => {
    appwriteService.deleteBlog(blog.$id)
      .then((status) => {
        if (status) {
          uploadService.deleteFile(blog.blogImage);
          navigate("/all-blogs");
        }
      });
  };

  if (!blog || !userData) {
    return <div className="w-full py-8 mt-4 text-center">
      <Container>
        <div className="flex justify-center items-center">
          <h1 className="text-xl font-medium">Loading your blog...</h1>
          <div className="ml-4 animate-spin rounded-full h-8 w-8 border-t-2 border-black"></div>
        </div>
      </Container>
    </div>
  }


  return blog ? (
    <div className="py-8 w-2/3 mx-auto">
      <Container>
        <div className="w-fit h-[60vh] flex justify-cente mx-auto mb-4 relative border border-black rounded-xl p-2">
          {blog.blogImage ? (
            <img
              src={uploadService.getFilePreview(blog.blogImage)}
              alt={blog.title}
              className="rounded-xl"
            />
          ) : (
            <img
              src="https://static.vecteezy.com/system/resources/previews/036/226/872/non_2x/ai-generated-nature-landscapes-background-free-photo.jpg"
              alt={blog.title}
              className="rounded-xl"
            />
          )}

          {isAuthor && (
            <div className="absolute right-4 top-4">
              <Link to={`/edit-blog/${blog.$id}`}>
                <Button bgColor="bg-green-500" className="mr-2">
                  Edit
                </Button>
              </Link>
              <Link to={`/all-blogs`}>
                <Button bgColor="bg-red-500" onClick={deleteblog}>
                  Delete
                </Button>
              </Link>
            </div>
          )}
        </div>
        <div className="w-full mb-6">
          <h1 className="text-2xl ml-4 font-bold">{blog.title}</h1>
        </div>
        <div className="browser-css">
          {parse(blog.content)}
        </div>
      </Container>
    </div>
  ) : null;
}
