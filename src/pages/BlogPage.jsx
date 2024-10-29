import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { Button, Container } from "../components";
import parse from "html-react-parser";
import ArrowCircleLeftIcon from '@mui/icons-material/ArrowCircleLeft';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import appwriteService from "../appwrite/appwriteService";
import uploadService from "../appwrite/fileUpload";

export default function BlogPage() {
  const [blog, setBlog] = useState(null);
  const [blogs, setBlogs] = useState([]);  // Store all blogs
  const [index, setIndex] = useState();  // Track current blog index
  const { id } = useParams(); // Changed to id instead of slug
  const navigate = useNavigate();

  const userData = useSelector((state) => state.auth.userData);
  const isAuthor = blog && userData ? blog.userId === userData.$id : false;

  // Fetch all blogs on load
  useEffect(() => {
    appwriteService.getAllBlogs([]).then((response) => {
      if (response) {
        setBlogs(response.documents);
        const currentBlogIndex = response.documents.findIndex(b => b.$id === id);
        setIndex(currentBlogIndex !== -1 ? currentBlogIndex : 0);  // Set initial index
      } else {
        navigate("/all-blogs");
      }
    });
  }, [id, navigate]);

  // Set the current blog based on the index without navigating
  useEffect(() => {
    if (blogs.length > 0 && index >= 0 && index < blogs.length) {
      setBlog(blogs[index]);
      window.history.replaceState(null, "", `/blog/${blogs[index].$id}`);  // Update URL without causing a re-render
    }
  }, [index, blogs]);

  const deleteblog = () => {
    appwriteService.deleteBlog(blog.$id)
      .then((status) => {
        if (status) {
          uploadService.deleteFile(blog.blogImage);
          navigate("/all-blogs");
        }
      });
  };

  // Handlers for navigating between blogs
  const handleNext = () => {
    setIndex((prevIndex) => (prevIndex > 0 ? prevIndex - 1 : blogs.length - 1));
  };

  const handlePrev = () => {
    setIndex((prevIndex) => (prevIndex + 1) % blogs.length);
  };

  const back = () => {
    navigate("/all-blogs");
  }

  if (!blog || !userData) {
    return (
      <div className="w-full py-8 mt-4 text-center">
        <Container>
          <div className="flex justify-center items-center">
            <h1 className="text-xl font-medium">Loading your blog...</h1>
            <div className="ml-4 animate-spin rounded-full h-8 w-8 border-t-2 border-black"></div>
          </div>
        </Container>
      </div>
    );
  }

  return blog ? (
    <div className="py-8 w-2/3 mx-auto">
      <Container>
        <div className="w-full flex justify-between items-center mb-4">
          <ArrowCircleLeftIcon
            className="cursor-pointer"
            fontSize="large"
            onClick={back}
          />
          <div className="flex justify-center space-x-4">
            <ArrowBackIosIcon
              className="cursor-pointer"
              fontSize="medium"
              onClick={handlePrev} />
            <ArrowForwardIosIcon
              className="cursor-pointer"
              fontSize="medium"
              onClick={handleNext} />
          </div>
        </div>
        <div className="w-fit flex justify-center mx-auto mb-4 relative border border-black rounded-xl p-1">
          {blog.blogImage ? (
            <img
              src={uploadService.getFilePreview(blog.blogImage)}
              alt={blog.title}
              className="rounded-xl max-h-[70vh]"
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
                <Button
                  bgColor="#52f752"
                  marginX={1}
                  paddingX={0.5}
                  paddingY={0.25}
                  fontSize="0.875rem"
                >
                  Edit
                </Button>
              </Link>
              <Button
                onClick={deleteblog}
                bgColor="red"
                paddingX={0.75}
                paddingY={0.25}
                fontSize="0.875rem"
              >
                Delete
              </Button>
            </div>
          )}
        </div>
        <div className="w-full text-center mb-6">
          <h1 className="text-2xl font-bold">{blog.title}</h1>
        </div>
        <div className="browser-css text-center">
          {parse(blog.content)}
        </div>
      </Container>
    </div>
  ) : null;
}
