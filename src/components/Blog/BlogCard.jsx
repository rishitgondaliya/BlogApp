/* eslint-disable react/prop-types */
import { Link } from 'react-router-dom'
import fileUploadService from '../../appwrite/fileUpload'

function BlogCard({$id, title, blogImg}) {
  return (
    <Link to={`/blog/${$id}`}>
      <div className="w-full bg-blue-200 rounded-xl p-4">
        <h2 className='text-2xl text-black font-medium'></h2>
        <div className="w-full justify-center mb-4">
          <img src={fileUploadService.getImgPreview(blogImg)} alt={title} className="w-full h-48" />
        </div>
      </div>
    </Link>
  )
}

export default BlogCard