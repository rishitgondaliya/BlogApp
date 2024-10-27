import { useEffect, useState } from 'react';
import { Container, BlogForm } from '../components';
import { useNavigate, useParams } from 'react-router-dom';
import appwriteService from '../appwrite/appwriteService';

function EditBlog() {
    const [blog, setBlog] = useState(null);
    const { id } = useParams(); // Use 'id' from the URL instead of 'slug'
    const navigate = useNavigate();

    useEffect(() => {
        if (id) { // Check if an 'id' exists in the URL
            appwriteService.getBlog(id) // Fetch the blog by 'id'
                .then((blog) => {
                    if (blog) {
                        setBlog(blog); // Set the blog data in the state
                    } else {
                        navigate("/all-blogs"); // Redirect if no blog is found
                    }
                })
                .catch((error) => {
                    console.error("Error fetching blog:", error);
                    navigate("/all-blogs"); // Redirect on error
                });
        } else {
            navigate("/all-blogs"); // Redirect if no 'id' is provided
        }
    }, [id, navigate]);

    return blog ? (
        <div className="py-8">
            <Container>
                <BlogForm blog={blog} />
            </Container>
        </div>
    ) : null;
}

export default EditBlog;
