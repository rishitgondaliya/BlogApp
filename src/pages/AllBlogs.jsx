import { useEffect, useState } from "react"
import { Container, BlogCard } from "../components"
import appwriteService from "../appwrite/appwriteService"

function AllBlogs() {
    const [blogs, setBlogs] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        appwriteService.getAllBlogs([])
            .then((response) => {
                if (response) {
                    setBlogs(response.documents)
                }
                setLoading(false)
            })
            .catch(() => {
                setLoading(false)
            })
    }, [])

    if (loading) {
        return <div className="w-full py-8 mt-4 text-center">
            <Container>
                <div className="flex justify-center items-center">
                    <h1 className="text-xl font-medium">Loading blogs for you...</h1>
                    <div className="ml-4 animate-spin rounded-full h-8 w-8 border-t-2 border-black"></div>
                </div>
            </Container>
        </div>
    }

    if (!blogs.length) {
        return <div className="text-center text-3xl my-8">No blogs available ☹️</div>;
    }

    return (
        <div className="w-full py-8">
            <Container>
                <div className="flex flex-wrap">
                    {blogs.map((blog) => (
                        <div key={blog.$id} className="p-2 w-1/4">
                            <BlogCard {...blog} />
                        </div>
                    ))}
                </div>
            </Container>
        </div>
    )
}

export default AllBlogs