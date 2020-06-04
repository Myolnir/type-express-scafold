import CreateTalkService from "../../contexts/core/user/application/CreateTalkService";
import Talk from "../../contexts/core/user/domain/Talk";

describe("CreateTalkService", () => {
    let createUserService: CreateTalkService;

    const mRepository = {
        save: jest.fn().mockReturnThis(),
        find: jest.fn().mockReturnThis(),
        delete: jest.fn().mockReturnThis(),
    };

    beforeEach(() => {
        createUserService = new CreateTalkService(mRepository);
        mRepository.find.mockReset();
        mRepository.save.mockReset();
        mRepository.delete.mockReset();
    });

    describe("when create user", () => {
        it("should return a created user", async () => {
            const userToCreate: Talk = new Talk("1", "name", "desc");
            const user = await createUserService.execute(userToCreate);
            expect(mRepository.save).toBeCalledTimes(1);
            expect(user).toBeInstanceOf(Talk);
        });
    });

});
