import { MongoMemoryServer } from "mongodb-memory-server";
import {config} from "../../config";
import {MongoUserRepository} from "../../contexts/core/user/infrastructure/MongoUserRepository";
import Talk from "../../contexts/core/user/domain/Talk";

describe("MongoUserRepository", () =>{
    let mongoUserRepository: MongoUserRepository;
    let mongod: MongoMemoryServer;

    beforeEach(async () => {
        mongod = new MongoMemoryServer();
        config.mongo.url = await mongod.getUri();
        mongoUserRepository = new MongoUserRepository(config);
    });

    describe("when save", () => {
        it("should save a new document on db", async ()=> {
            const userToCreate = new Talk("1", "name", "desc");
            await mongoUserRepository.save(userToCreate);
            const dbUser = await mongoUserRepository.find(userToCreate.id);
            expect(dbUser.id).toEqual(userToCreate.id);
        });
    });

    describe("when find", () => {
        it("should return the existing document on db", async ()=> {
            const userToCreate = new Talk("1", "name", "desc");
            await mongoUserRepository.save(userToCreate);
            const dbUser = await mongoUserRepository.find(userToCreate.id);
            expect(dbUser.id).toEqual(userToCreate.id);
        });

        it("should return null if the document does not exists", async ()=> {
            const userToCreate = new Talk("1", "name", "desc");
            await mongoUserRepository.save(userToCreate);
            const dbUser = await mongoUserRepository.find("2");
            expect(dbUser).toBe(null);
        });
    });

    describe("when delete", () => {
        it("should delete the existing document on db", async ()=> {
            const userToCreate = new Talk("1", "name", "desc");
            await mongoUserRepository.save(userToCreate);
            await mongoUserRepository.delete(userToCreate.id);
            const dbUser = await mongoUserRepository.find(userToCreate.id);
            expect(dbUser).toBe(null);
        });

    });
});
