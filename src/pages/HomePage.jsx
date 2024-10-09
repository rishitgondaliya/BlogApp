import {useState, useEffect} from 'react'
import appwriteService from '../appwrite/appwriteService'
import { Container, BlogCard } from '../components'

function HomePage() {
    const [blogs, setBlogs] = useState([])
    useEffect(() => {
        appwriteService.getAllBlogs
        .then((blogs) => {
            if(blogs) {
                setBlogs(blogs.documents)
            }
        })
    }, [])

    if(blogs.length === 0) {
        return <div>Loading...</div>
    } 
    return (
        <div className="w-full py-8">
            <Container>
                <div className="flex flex-wrap">
                    {blogs.map((blog) => (
                        <BlogCard className="p-2 w-1/4" key={blog.id} blog={blog} />
                    ))}
                </div>
            </Container>
        </div>
    )
}

export default HomePage