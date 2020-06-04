import InMemoryUserRepository from "../../contexts/core/user/infrastructure/InMemoryUserRepository";
import Talk from "../../contexts/core/user/domain/Talk";

describe("InMemoryUserRepository", () =>{
    let inMemoryUserRepository: InMemoryUserRepository;

    beforeEach(async () => {
        inMemoryUserRepository = new InMemoryUserRepository();
    });

    describe("when save", () => {
        it("should save a new element on array", async ()=> {
            const userToCreate = new Talk("1", "name", "desc");
            await inMemoryUserRepository.save(userToCreate);
            const dbUser = await inMemoryUserRepository.find(userToCreate.id);
            expect(dbUser.id).toEqual(userToCreate.id);
        });
    });

    describe("when find", () => {
        it("should return the existing element on array", async ()=> {
            const userToCreate = new Talk("1", "name", "desc");
            await inMemoryUserRepository.save(userToCreate);
            const dbUser = await inMemoryUserRepository.find(userToCreate.id);
            expect(dbUser.id).toEqual(userToCreate.id);
        });

        it("should return null if the document does not exists", async ()=> {
            const userToCreate = new Talk("1", "name", "desc");
            await inMemoryUserRepository.save(userToCreate);
            const dbUser = await inMemoryUserRepository.find("2");
            expect(dbUser).toBe(undefined);
        });
    });

    describe("when delete", () => {
        it("should delete the existing element on array", async ()=> {
            const userToCreate = new Talk("1", "name", "desc");
            await inMemoryUserRepository.save(userToCreate);
            await inMemoryUserRepository.delete(userToCreate.id);
            const dbUser = await inMemoryUserRepository.find(userToCreate.id);
            expect(dbUser).toBe(undefined);
        });

    });
});
