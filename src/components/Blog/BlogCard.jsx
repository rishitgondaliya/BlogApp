/* eslint-disable react/prop-types */
import { Link } from 'react-router-dom'
import fileUploadService from '../../appwrite/fileUpload'

function BlogCard({ $id, title, blogImage }) {
  const imageUrl = blogImage
    ? fileUploadService.getFilePreview(blogImage)
    : "https://static.vecteezy.com/system/resources/previews/036/226/872/non_2x/ai-generated-nature-landscapes-background-free-photo.jpg";
  
    return (
    <Link to={`/blog/${$id}`}>
      <div className="w-fit max-w-80 mx-auto max-h-64 bg-blue-200 rounded-xl p-4">
        <div className="w-full justify-center mb-2">
          <img src={imageUrl} alt={title} className="rounded-xl max-h-48" />
        </div>
        <h2 className='text-xl text-black font-bold'>{title}</h2>
      </div>
    </Link>
  )
}

export default BlogCard