import conf from "../conf/conf";
import {Client, ID, Databases, Storage, Query, Permission, Role}  from "appwrite";


export class Service {
    client = new Client();
    databases;
    bucket;

    constructor() {
        this.client.setEndpoint(conf.appWriteUrl)
        .setProject(conf.appWriteProjectId);
        this.databases = new Databases(this.client);
        this.bucket = new Storage(this.client);
    }
    async createPost({title, slug, content, featuredImage, status, userId}) {
        try {
            return await this.databases.createDocument(
                conf.appWriteDatabaseId,
                conf.appWriteCollectionId,
                slug,
                {
                    title, 
                    content, 
                    featuredImage,
                    status,
                    userId
                },
                [
                    Permission.read(Role.any()),                  // Anyone can view this document
                    Permission.update(Role.any()),      // Writers can update this document
                    Permission.delete(Role.any()), // User 5c1f88b42259e can delete this document
                ]
            )
        } catch (err) {
            throw err;
        }
        return false;
    }
    async updatePost(slug, {title, content, featuredImage, status}) {
        
        try {
            return await this.databases.updateDocument(
                conf.appWriteDatabaseId,
                conf.appWriteCollectionId,
                slug,
                {
                    title, 
                    content, 
                    featuredImage,
                    status
                },
                [
                    Permission.read(Role.any()),                  // Anyone can view this document
                    Permission.update(Role.any()),      // Writers can update this document
                    Permission.delete(Role.any()), // User 5c1f88b42259e can delete this document
                ]
            )
        } catch (err) {
            throw err;
        }
        return false;
    }
    async deletePost(slug) {
        try {
            await this.databases.deleteDocument(
                conf.appWriteDatabaseId,
                conf.appWriteCollectionId,
                slug
            )
            return true;
        } catch (err) {
            throw err;
        }
        return false;
    }
    async getPost(slug) {
        try {
            return await this.databases.getDocument(
                conf.appWriteDatabaseId,
                conf.appWriteCollectionId,
                slug
            )
        } catch (err) {
            throw err;
        }
        return false;
    }
    async getPosts(queries = [Query.equal("status", "active")]) {
        try {
            return await this.databases.listDocuments(
                conf.appWriteDatabaseId,
                conf.appWriteCollectionId,
                queries
            )
        } catch (err) {
            console.log(err);
            throw err;
        }
        return false;
    }
    async uploadFile(file) {
        try {
            return await this.bucket.createFile(
                conf.appWriteBucketId,
                ID.unique(),
                file
            )
        } catch (err) {
            throw err;
        }
        return false;
    }
    async deleteFile(fileId) {
        try {
            await this.bucket.deleteFile(
                conf.appWriteBucketId,
                fileId
            )
            return true;
        } catch (err) {
            throw err;
        }
        return false;
    }
     getfilePreview(fileId) {
        try {
            return this.bucket.getFilePreview(
                conf.appWriteBucketId,
                fileId
            )
        } catch (err) {
            throw err;
        }
        return false;
    }
}
const service = new Service();
export default service;