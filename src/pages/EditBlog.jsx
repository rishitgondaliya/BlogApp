import { useEffect, useState } from 'react'
import { Container, BlogForm } from '../components'
import appwriteService from '../appwrite/appwriteService'
import { useNavigate, useParams } from 'react-router-dom'

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
            navigate("/")
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