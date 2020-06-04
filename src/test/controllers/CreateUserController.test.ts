import {CreateTalkController} from "../../api/controllers/useCases/createTalk/CreateTalkController";

describe("CreateUserController", () => {
   let createUserController: CreateTalkController;

    const mService: any = {
        execute: jest.fn().mockReturnThis()
    };
    const mockResponse: any = { status: jest.fn().mockReturnThis(), json: jest.fn() };


    beforeEach(() => {
        createUserController = new CreateTalkController(mService);
        mService.execute.mockReset();

    });

    describe("when create user", () => {
        it("should return a created user", async () => {
            const req: any = {
                body: {
                    name: "name",
                    description: "description",
                }
            };
            mockResponse.json.mockReturnValueOnce(200);
            await createUserController.execute(req, mockResponse);
            expect(mService.execute).toBeCalledTimes(0);
        });
    });
});
