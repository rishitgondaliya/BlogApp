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

  async uploadFile(file) {
    try {
        return await this.blogBucket.createFile(
            conf.appwriteBlogImageBucketID,
            ID.unique(),
            file
        );
    } catch (error) {
        console.log("Appwrite service :: uploadBlogImg :: error ", error);   
        return false;
    }
  }

  async deleteFile(fileID) {
    try {
        await this.blogBucket.deleteFile(
            conf.appwriteBlogImageBucketID,
            fileID
        );
        return true;
    } catch (error) {
        console.log("Appwrite service :: deleteBlogImg :: error ", error);
        return false;
    }
  }

  getFilePreview(fileID) {
    return this.blogBucket.getFilePreview(
        conf.appwriteBlogImageBucketID,
        fileID
    );
  }
}

const uploadService = new fileUploadService();
export default uploadService;
