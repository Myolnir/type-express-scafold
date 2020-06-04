import UserRepository from "../domain/UserRepository";
import User from "../domain/User";
import {logger} from "../../../../api/shared/logger";
const MongoClient = require("mongodb").MongoClient;

type UserInPersistence = {
    _id: string;
    _name: string;
    _description: string;
    _createdAt: Date;
    _modifiedAt: Date;
    _deletedAt: Date;
};

export class MongoUserRepository implements UserRepository {

    constructor(private readonly config: any) {}

    private async getConnection(): Promise<any> {
        return await MongoClient
            .connect(this.config.mongo.url, {useUnifiedTopology: true, useNewUrlParser: true});
    }

    async delete(id: string): Promise<void> {
        logger.info("Deleting user", id);
        const dbClient = await this.getConnection();
        await dbClient.db("user").collection("users").deleteOne({"_id":id});
        dbClient.close();
    }

    async find(id: string): Promise<User> {
        logger.info("Finding user on our database", {id});
        const dbClient = await this.getConnection();
        const user: UserInPersistence = await dbClient.db("user").collection("users").findOne({"_id":id});
        dbClient.close();
        return user ? this.transformPersistenceObjectToUser(user) : null;
    }

    async save(user: User): Promise<void> {
        logger.info("Saving user", user);
        const dbClient = await this.getConnection();
        await dbClient.db("user").collection("users")
            .insertOne(user);
        dbClient.close();
    }

    private transformPersistenceObjectToUser(persistenceUser: UserInPersistence): User {
        const user: User = new User(persistenceUser._id, persistenceUser._name, persistenceUser._description);
        user.createdAt = persistenceUser._createdAt;
        return user;
    }



}
