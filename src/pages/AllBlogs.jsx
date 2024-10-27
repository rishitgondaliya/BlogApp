import { useEffect, useState } from "react";
import { Container, BlogCard, Button } from "../components";
import appwriteService from "../appwrite/appwriteService";

function AllBlogs() {
    const [blogs, setBlogs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [displayedBlogs, setDisplayedBlogs] = useState([])
    const blogPerPage = 8;

    useEffect(() => {
        appwriteService.getAllBlogs([])
            .then((response) => {
                if (response) {
                    // Sort blogs by $createdAt in descending order (latest blogs first)
                    const sortedBlogs = response.documents.sort((a, b) => new Date(b.$createdAt) - new Date(a.$createdAt));
                    setBlogs(sortedBlogs);
                    setDisplayedBlogs(sortedBlogs.slice(0, blogPerPage))
                }
                setLoading(false);
            })
            .catch(() => {
                setLoading(false);
            });
    }, []);

    const loadMoreBlogs = () => {
        const currentCount = displayedBlogs.length
        const nextBatch = blogs.slice(currentCount, currentCount + blogPerPage)
        setDisplayedBlogs((prevBlogs) => [...prevBlogs, ...nextBatch])
    }

    if (loading) {
        return (
            <div className="w-full py-8 mt-4 text-center">
                <Container>
                    <div className="flex justify-center items-center">
                        <h1 className="text-xl font-medium">Loading blogs for you...</h1>
                        <div className="ml-4 animate-spin rounded-full h-8 w-8 border-t-2 border-black"></div>
                    </div>
                </Container>
            </div>
        );
    }

    if (!blogs.length) {
        return <div className="text-center text-3xl my-8">No blogs available ☹️</div>;
    }

    return (
        <div className="w-full py-8 px-4">
            <Container>
                <div className="flex flex-wrap">
                    {displayedBlogs.map((blog) => (
                        <div key={blog.$id} className="p-2 w-1/4">
                            <BlogCard {...blog} />
                        </div>
                    ))}
                </div>
                {displayedBlogs.length < blogs.length && (
                    <div className="text-center">
                        <Button
                        onClick={loadMoreBlogs}
                        paddingX={2}
                        paddingY={1}
                        marginY={4}
                        fontSize={'0.875rem'}
                        className="rounded-full font-semibold"
                        >
                            Load more..
                        </Button>
                    </div>
                )}
            </Container>
        </div>
    );
}

export default AllBlogs;
