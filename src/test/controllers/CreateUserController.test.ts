import {CreateUserController} from "../../api/controllers/useCases/createUser/CreateUserController";

describe("CreateUserController", () => {
   let createUserController: CreateUserController;

    const mService: any = {
        execute: jest.fn().mockReturnThis()
    };
    const mockResponse: any = { status: jest.fn().mockReturnThis(), json: jest.fn() };


    beforeEach(() => {
        createUserController = new CreateUserController(mService);
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
