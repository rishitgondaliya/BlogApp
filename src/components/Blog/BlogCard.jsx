/* eslint-disable react/prop-types */
import { Link } from 'react-router-dom'
import fileUploadService from '../../appwrite/fileUpload'

function BlogCard({ $id, title, blogImage }) {
  const imageUrl = blogImage
    ? fileUploadService.getFilePreview(blogImage)
    : "https://static.vecteezy.com/system/resources/previews/036/226/872/non_2x/ai-generated-nature-landscapes-background-free-photo.jpg";
  
    return (
    <Link to={`/blog/${$id}`}>
      <div className="w-fit mx-auto bg-blue-200 rounded-xl">
        <div className="w-full max-w-80 justify-center mb-2 px-4 pt-4">
          <img src={imageUrl} alt={title} className="rounded-xl max-h-48 min-h-40 mx-auto" />
        </div>
        <h2 className='text-lg text-black text-center font-bold px-2 pb-2'>{title}</h2>
      </div>
    </Link>
  )
}

export default BlogCard