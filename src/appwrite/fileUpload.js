import { Client, Storage, ID } from "appwrite";
import conf from "../conf/conf";

export class fileUploadService {
  client = new Client();
  blogBucket;
  profileBucket;

  constructor() {
    this.client
      .setEndpoint(conf.appwriteURL)
      .setProject(conf.appwriteProjectID);
    this.blogBucket = new Storage(this.client);
    this.profileBucket = new Storage(this.client);
  }

  async uploadBlogImage(blogImg) {
    try {
        return await this.blogBucket.createFile(
            conf.appwriteBlogImageBucketID,
            ID.unique(),
            blogImg
        )
    } catch (error) {
        console.log("Appwrite service :: uploadBlogImg :: error ", error);   
    }
  }

  async deleteBlogImage(imgID) {
    try {
        await this.blogBucket.deleteFile(
            conf.appwriteBlogImageBucketID,
            imgID
        )
        return true
    } catch (error) {
        console.log("Appwrite service :: deleteBlogImg :: error ", error);
    }
  }

  getImgPreview(imgID) {
    return this.blogBucket.getFilePreview(
        conf.appwriteBlogImageBucketID,
        imgID
    )
  }
}

const uploadService = new fileUploadService();
export default uploadService;
