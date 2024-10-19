import { useState } from 'react';
import { Button } from '../components';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { ImageSlider } from '../components/index';
import map2 from '../assets/worldmap2.jpg';

function HomePage() {
    const [bgColor, setBgColor] = useState('#cf3e34');
    const userData = useSelector((state) => state.auth.userData);

    return (
        <div>
            <section
                className="w-full text-white px-10 pt-10 text-center"
                style={{ backgroundColor: bgColor }} // Set dynamic background color
            >
                <h2 className="text-5xl font-bold">Welcome to Blogify!</h2>
                <p className="mt-4 text-2xl">Share your stories with the world.</p>

                {
                    !userData ? <Link to="/login">
                        <Button
                            bgColor='#f97316'
                            margin={4}
                            paddingX={2}
                            paddingY={1}
<<<<<<< HEAD
                            fontSize={'1rem'}
=======
>>>>>>> 07155e18369b9977e519e6175721ad83a990bf1c
                        >
                            CREATE YOUR BLOG
                        </Button>
                    </Link> : <Link to="/create-blog">
                        <Button
                            bgColor='#f97316'
                            margin={4}
                            paddingX={2}
                            paddingY={1}
                            fontSize={'1rem'}
                        >
                            CREATE YOUR BLOG
                        </Button>
                    </Link>
                }

                {/* ImageCarousel and pass setBgColor */}
                <ImageSlider setBgColor={setBgColor} />
            </section>

            <section
                className="relative w-full h-screen bg-cover bg-center"
                style={{
                    backgroundImage: `url(${map2})`, // Set the background image
                }}
            >
                <div className="absolute inset-0 bg-black opacity-55"></div>

                <div className="relative z-10 flex flex-col justify-center items-center h-full text-white text-center">
                    <h1 className="text-5xl font-medium">Join millions of others</h1>
                    <div className="text-xl font-medium mt-4 w-2/5 mx-auto">Whether sharing your expertise, breaking news, or whatever’s on your mind, you’re in good company on Blogger. Sign up to discover why millions of people have published their passions here.</div>

                    {
                        !userData ? <Link to="/login">
                            <Button
                                bgColor='#f97316'
                                margin={4}
                                paddingX={2}
                                paddingY={1}
<<<<<<< HEAD
                                fontSize={'1rem'}
=======
>>>>>>> 07155e18369b9977e519e6175721ad83a990bf1c
                            >
                                CREATE YOUR BLOG
                            </Button>
                        </Link> : <Link to="/create-blog">
                            <Button
                                bgColor='#f97316'
                                margin={4}
                                paddingX={2}
                                paddingY={1}
<<<<<<< HEAD
                                fontSize={'1rem'}
=======
>>>>>>> 07155e18369b9977e519e6175721ad83a990bf1c
                            >
                                CREATE YOUR BLOG
                            </Button>
                        </Link>
                    }
                </div>
            </section>
        </div>
    );
}

export default HomePage;
