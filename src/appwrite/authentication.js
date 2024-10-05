import { Client, Account, ID } from "appwrite";
import conf from "../conf/conf";

export class AuthService {
  client = new Client();
  account;

  constructor() {
    this.client
      .setEndpoint(conf.appwriteURL)
      .setProject(conf.appwriteProjectID);
    this.account = new Account(this.client);
  }

  async createAccount({ email, password, name }) {
    try {
      const userAccount = await this.account.create(
        ID.unique(),
        email,
        password,
        name
      );
      if (userAccount) {
        return this.login({email, password});
      } else {
        console.log("account not created!");
      }
    } catch (error) {
      console.log("Appwrite service :: createUserAccount :: error ", error);
    }
  }

  async login ({email, password}) {
    try {
        await this.account.createEmailPasswordSession(email, password)
    } catch (error) {
        console.log("Appwrite service :: userLogin :: error ", error)
    }
  }

  async getCurrentUser() {
    try {
        return await this.account.get()
    } catch (error) {
        console.log("Appwrite service :: getCurrentUser :: error ", error);
    }

    return null
  }

  async logout() {
    try {
        await this.account.deleteSessions( )
    } catch (error) {
        console.log("Appwrite service :: logout :: error ", error); 
    }
  }
}

const authService = new AuthService();

export default authService;
