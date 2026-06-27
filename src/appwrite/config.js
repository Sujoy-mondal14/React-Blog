import config from "../config/config";
import { Client, ID, Databases, Storage, Query } from 'appwrite'

export class Service {
    client = new Client();
    databases;
    storage;

    constructor() {
        this.client
            .setEndpoint(config.appwriteUrl)
            .setProject(config.appwriteProjectId);
        this.databases = new Databases(this.databases);
        this.storage = new Storage(this.client);
    }

    //POST CREATION DB
    async createPost({ title, slug, content, featuredImage, status, userId }) {
        try {
            return await this.databases.createDocument(
                config.appwriteDatabaseId,
                config.appwriteCollectionId,
                slug,
                {
                    title,
                    content,
                    featuredImage,
                    status,
                    userId
                }
            )
        } catch (error) {
            console.log('error at :: createpost ::', error);

        }
    }

    // POST UPDATION --DB
    async updatePost(slug, { title, content, featuredImage, status }) {
        try {
            return await this.databases.updateDocument(
                config.appwriteDatabaseId,
                config.appwriteCollectionId,
                slug,
                {
                    title,
                    content,
                    featuredImage,
                    status,
                }
            )
        } catch (error) {
            console.log('error at :: updatepost :: ', error);

        }
    }

    // POST DELETE --DB 
    async deletePost(slug) {
        try {
            await databases.deleteDocument(
                config.appwriteDatabaseId,
                config.appwriteCollectionId,
                slug,
            )
            return true;
        } catch (error) {
            console.log(error);
            return false;


        }
    }

    // GET POST --DB    
    async getPost(slug) {
        try {
            return await this.databases.getPost(
                config.appwriteDatabaseId,
                config.appwriteCollectionId,
                slug,
            )
        } catch (error) {
            console.log(error);
            return false;
        }
    }

    //GET ACTIVE POSTS
    async getPosts(
        queries = [
            Query.equal('status', 'active')
        ]
    ) {
        try {
            return await this.databases.listDocuments(
                config.appwriteDatabaseId,
                config.appwriteCollectionId,
                queries,
            )
        } catch (error) {
            console.log(error);
            return false;

        }
    }



    //FILE UPLODE
    async filleUploade(file) {
        try {
            return await this.storage.createFile(
                config.appwriteBucketId,
                ID.unique(),
                file,
            )
        } catch (error) {
            console.log(error);
            return false;
        }
    }

    //DELETE FILE
    async deleteFile(fileId) {
        try {
            await this.storage.deleteFile(
                config.appwriteBucketId,
                fileId,
            )
            return true;
        } catch (error) {
            console.log(error);
            return false;
        }
    }

    //FILE PREVIWE
    getFilePreview(fileId){
        try {
            return this.storage.getFilePreview(
                config.appwriteBucketId,
                fileId,
            )
        } catch (error) {
            console.log(error);
            return false;
            
        }
    }
}

const service = new Service();

export default service;