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
        <div className="w-full md:max-w-80 sm:max-w-64 justify-center mb-2 md:px-4 sm:px-2 md:pt-4 sm:pt-2">
          <img src={imageUrl} alt={title} className="rounded-xl md:max-h-52 md:min-h-44 sm:max-h-44 sm:min-h-36 mx-auto" />
        </div>
        <h2 className='text-lg text-black text-center font-bold px-2 pb-2'>{title}</h2>
      </div>
    </Link>
  )
}

export default BlogCard