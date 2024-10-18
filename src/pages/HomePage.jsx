import { useState, useEffect } from 'react';
import { Container, BlogCard, Button } from '../components';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import ImageCarousel from '../components/index';
import appwriteService from '../appwrite/appwriteService';
import map2 from '../assets/worldmap2.jpg'; // Import the background image

function HomePage() {
    const [blogs, setBlogs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [bgColor, setBgColor] = useState('#cf3e34'); // Default background color for carousel section
    const userData = useSelector((state) => state.auth.userData);

    useEffect(() => {
        if (userData) {
            appwriteService.getAllBlogs()
                .then((response) => {
                    if (response) {
                        setBlogs(response.documents);
                    }
                })
                .finally(() => setLoading(false));
        } else {
            setLoading(false); // If no user data, stop loading
        }
    }, [userData]);

    // If the user is not logged in, show login message
    if (!userData) {
        return (
            <div>
                <section
                    className="w-full text-white px-10 pt-10 text-center"
                    style={{ backgroundColor: bgColor }} // Set dynamic background color
                >
                    <h2 className="text-5xl font-bold">Welcome to Blogify!</h2>
                    <p className="mt-4 text-2xl">Share your stories with the world.</p>
                    <Link to="/login">
                        <Button className="mt-6 mb-8 rounded-sm text-lg bg-orange-500 text-white">
                            CREATE YOUR BLOG
                        </Button>
                    </Link>
                    {/* Include ImageCarousel and pass setBgColor */}
                    <ImageCarousel setBgColor={setBgColor} />
                </section>

                <section
                    className="relative w-full h-screen bg-cover bg-center"
                    style={{
                        backgroundImage: `url(${map2})`, // Set the background image
                    }}
                >
                    {/* Overlay to darken the background without affecting text */}
                    <div className="absolute inset-0 bg-black opacity-55"></div>

                    <div className="relative z-10 flex flex-col justify-center items-center h-full text-white text-center">
                        <h1 className="text-5xl font-medium">Join millions of others</h1>
                        <div className="text-xl font-medium mt-4 w-2/5 mx-auto">Whether sharing your expertise, breaking news, or whatever’s on your mind, you’re in good company on Blogger. Sign up to discover why millions of people have published their passions here.</div>
                        <Link to="/login">
                            <Button className="mt-16 rounded-sm text-lg bg-orange-500 text-white">
                                CREATE YOUR BLOG
                            </Button>
                        </Link>
                    </div>
                </section>
            </div>
        );
    }

    // If the user is logged in and blogs are loading
    if (loading) {
        return (
            <div className="w-full py-8 mt-4 text-center">
                <Container>
                    <div className="flex justify-center items-center">
                        <h1 className="text-xl font-medium">Loading...</h1>
                        <div className="ml-4 animate-spin rounded-full h-8 w-8 border-t-2 border-black"></div>
                    </div>
                </Container>
            </div>
        );
    }

    // Render the blogs if the user is authenticated and loading is complete
    return (
        <div className="w-full py-8">
            <Container>
                <div className="flex flex-wrap">
                    {blogs.map((blog) => (
                        <div key={blog.$id} className="w-1/4 p-2">
                            <BlogCard {...blog} />
                        </div>
                    ))}
                </div>
            </Container>
        </div>
    );
}

export default HomePage;
