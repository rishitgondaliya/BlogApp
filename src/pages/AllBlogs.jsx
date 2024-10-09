import { useEffect, useState } from "react"
import appwriteService from "../appwrite/appwriteService"
import { Container, BlogCard } from "../components"

function AllBlogs() {
    const [blogs, setBlogs] = useState([])
    useEffect(() => {}, [])
    appwriteService.getAllBlogs([])
    .then((blogs) => {
        if(blogs) {
            setBlogs(blogs.documents)
        }
    })
  return (
    <div className="w-full py-8">
        <Container>
            <div className="flex flex-wrap">
                {blogs.map((blog) => (
                    <div key={blog.$id} className="p-2 w-1/4">
                        <BlogCard blog={blog} />
                    </div>
                ))}    
            </div>    
        </Container>        
    </div>
  )
}

export default AllBlogs