import * as express from "express";
import {Result} from "../../../../contexts/core/user/domain/Result";
import User from "../../../../contexts/core/user/domain/User";
import {BaseController} from "../../../shared/shared/infra/http/models/BaseController";
import {logger} from "../../../shared/shared/logger";
import CreateUserService from "../../../../contexts/core/user/application/CreateUserService";

export class CreateUserController extends BaseController{

    constructor(private readonly createUserService: CreateUserService) {
        super();
        this.createUserService = createUserService;
    }

    protected async executeImpl (req: express.Request, res: express.Response): Promise<void | any> {
        logger.debug("User create controller", {payload: req.body});
        try {
            const { name, description } = req.body;
            if (!name || ! description) {
                logger.error("There is an error on the payload params", {payload: req.body});
                return this.fail(res, new Error("Name and description are required"));
            }
            const userOnError:  Result<User> = User.createUser(name, description);
            if (userOnError.isFailure) {
                logger.error("There is an error validating the payload", {payload: req.body});
                return this.fail(res, userOnError.error);
            }
            const user: User = userOnError.getValue();
            const dbUser = await this.createUserService.execute(user);
            return this.ok<any>(res, dbUser);
        } catch (err) {
            logger.error("Error",{err});
            return this.fail(res, err.toString());
        }
    }
}
