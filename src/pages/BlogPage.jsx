/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import parse from "html-react-parser";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { Button, Container } from "../components";
import appwriteService from "../appwrite/appwriteService";

export default function BlogPage() {
  const [blog, setblog] = useState(null);
  const { slug } = useParams();
  const navigate = useNavigate();

  const userData = useSelector((state) => state.auth.userData);

  const isAuthor = blog && userData ? blog.userId === userData.$id : false;

  useEffect(() => {
    if (slug) {
      appwriteService.getblog(slug).then((blog) => {
        if (blog) setblog(blog);
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
    appwriteService.deleteblog(blog.$id).then((status) => {
      if (status) {
        appwriteService.deleteFile(blog.featuredImage);
        navigate("/");
      }
    });
  };

  if (!blog || !userData) {
    return <div className="w-full py-8 mt-4 text-center">
      <Container>
        <div className="flex flex-wrap">
          <div className="p-2 w-full">
            <h1 className="text-2xl font-bold hover:text-gray-500">
              Loading your blog...
            </h1>
          </div>
        </div>
      </Container>
    </div>
  }


  return blog ? (
    <div className="py-8 w-2/3 mx-auto">
      <Container>
        <div className="w-full mb-6">
          <h1 className="text-2xl ml-4 font-bold">{blog.title}</h1>
        </div>
        <div className="w-fit h-[60vh] flex justify-cente mx-auto mb-4 relative border border-black rounded-xl p-2">
          {blog.featuredImage ? (
            <img
              src={appwriteService.getFilePreview(blog.featuredImage)}
              alt={blog.title}
              className="rounded-xl"
            />
          ) : (
            <img
              src="https://static.vecteezy.com/system/resources/previews/036/226/872/non_2x/ai-generated-nature-landscapes-background-free-photo.jpg"
              alt="Placeholder"
              className="rounded-xl"
            />
          )}

          {isAuthor && (
            <div className="absolute right-6 top-6">
              <Link to={`/edit-blog/${blog.$id}`}>
                <Button bgColor="bg-green-500" className="mr-3">
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
        <div className="browser-css">
          {parse(blog.content)}
        </div>
      </Container>
    </div>
  ) : null;
}
