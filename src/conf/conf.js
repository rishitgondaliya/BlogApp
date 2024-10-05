const conf = {
    appwriteURL : String(import.meta.env.VITE_APPWRITE_URL),
    appwriteProjectID : String(import.meta.env.VITE_APPWRITE_PROJECT_ID),
    appwriteDatabaseID : String(import.meta.env.VITE_APPWRITE_DATABASE_ID),
    appwriteCollectionID : String(import.meta.env.VITE_APPWRITE_COLLECTION_ID),
    appwriteBlogImageBucketID : String(import.meta.env.VITE_APPWRITE_BLOG_IMAGE_BUCKET_ID),
    appwriteProfileImageBucketID : String(import.meta.env.VITE_APPWRITE_PROFILE_PICTURE_BUCKET_ID),
    editorAPI_KEY : String(import.meta.env.VITE_TINYMCE_API_KEY),
}

export default conf