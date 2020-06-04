import CreateUserService from "../../contexts/core/user/application/CreateUserService";
import User from "../../contexts/core/user/domain/User";

describe("CreateUserService", () => {
    let createUserService: CreateUserService;

    const mRepository = {
        save: jest.fn().mockReturnThis(),
        find: jest.fn().mockReturnThis(),
        delete: jest.fn().mockReturnThis(),
    };

    beforeEach(() => {
        createUserService = new CreateUserService(mRepository);
        mRepository.find.mockReset();
        mRepository.save.mockReset();
        mRepository.delete.mockReset();
    });

    describe("when create user", () => {
        it("should return a created user", async () => {
            const userToCreate: User = new User("1", "name", "desc");
            const user = await createUserService.execute(userToCreate);
            expect(mRepository.save).toBeCalledTimes(1);
            expect(user).toBeInstanceOf(User);
        });
    });

});
