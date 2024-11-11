import { Client, Databases, Query } from "appwrite";
import conf from "../conf/conf";

export class appwriteService {
  client = new Client();
  databases;

  constructor() {
    this.client
      .setEndpoint(conf.appwriteURL)
      .setProject(conf.appwriteProjectID);
    this.databases = new Databases(this.client);
  }

  async createBlog({ title, content, blogImage, status, userId }) {
    try {
      return await this.databases.createDocument(
        conf.appwriteDatabaseID,
        conf.appwriteCollectionID,
        'unique()',
        {
          title,
          content,
          blogImage,   
          status,
          userId,
        }
      );
    } catch (error) {
      console.log("Appwrite service :: createBlog :: error ", error);
    }
  }

  async updateBlog(blogId, { title, content, blogImage, status }) {
    try {
      return await this.databases.updateDocument(
        conf.appwriteDatabaseID,
        conf.appwriteCollectionID,
        blogId,
        {
          title,
          content,
          blogImage,  
          status,
        }
      );
    } catch (error) {
      console.log("Appwrite service :: updateBlog :: error ", error);
    }
  }

  async deleteBlog(blogId) {
    try {
      await this.databases.deleteDocument(
        conf.appwriteDatabaseID,
        conf.appwriteCollectionID,
        blogId
      );
      return true;
    } catch (error) {
      console.log("Appwrite service :: deleteBlog :: error ", error);
      return false
    }
  }

  async getBlog(blogId) {
    try {
      return await this.databases.getDocument(
        conf.appwriteDatabaseID,
        conf.appwriteCollectionID,
        blogId
      );
    } catch (error) {
      console.log("Appwrite service :: getBlog :: error ", error);
      return false;
    }
  }

  async getAllBlogs(queries = [Query.equal("status", "active")]) {
    try {
      return await this.databases.listDocuments(
        conf.appwriteDatabaseID,
        conf.appwriteCollectionID,
        queries
      );
    } catch (error) {
      console.log("Appwrite service :: getBlogs :: error ", error);
      return false;
    }
  }
}

const service = new appwriteService();
export default service;
