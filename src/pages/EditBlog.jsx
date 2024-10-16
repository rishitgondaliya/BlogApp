import { useEffect, useState } from 'react'
import { Container, BlogForm } from '../components'
import { useNavigate, useParams } from 'react-router-dom'
import appwriteService from '../appwrite/appwriteService'

function EditBlog() {
    const [blog, setBlog] = useState(null)
    const { slug } = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        if (slug) {
            appwriteService.getBlog(slug)
                .then((blog) => {
                    if (blog) {
                        setBlog(blog)
                    }
                })
        } else {
            navigate("/all-blogs")
        }
    }, [slug, navigate])

    return blog ? (
        <div className="py-8">
            <Container>
                <BlogForm blog={blog} />
            </Container>
        </div>
    ) : null
}

export default EditBlog