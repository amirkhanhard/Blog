import  {Client, Account, ID} from "appwrite"
import conf from "../conf/conf.js"

export class AuthService {
    client = new Client()
    account;
    constructor() {
        this.client.setEndpoint(conf.appWriteUrl)
        .setProject(conf.appWriteProjectId);
        this.account = new Account(this.client);
    }
    async createAccount({email, password, name}) {
        try {
            const userAccount = await this.account.create(ID.unique(), email, password, name);
            if(userAccount) {
                return this.login({email, password});
            } else {
                return userAccount;
            }
        } catch (err) {
            console.log(err);
            throw err;
        }
    }
    async login({email, password}) {
        try {
            return await this.account.createEmailPasswordSession(email, password);
        } catch(err) {
            console.log(err);
            throw err;
        }
    }
    async getCurrentUser() {
        try {
            return await this.account.get();
        } catch(err) {
            throw err;
        }
        return null;
    }
    async logout() {
        try {
            return await this.account.deleteSessions();
        } catch(err) {
            throw err;
        }
        return null;
    }
}

const authService = new AuthService();
export default authService;
