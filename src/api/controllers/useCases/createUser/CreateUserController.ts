import * as express from "express";
import CreateUserService from "../../../../contexts/core/user/application/CreateUserService";
import {logger} from "../../../shared/logger";

export class CreateUserController {

    constructor(private readonly createUserService: CreateUserService) {
        this.createUserService = createUserService;
    }

    async execute (req: express.Request, res: express.Response): Promise<void | any> {
        logger.debug("User create controller", {payload: req.body});
        try {
            return res.status(200).json(req.body);
        } catch (err) {
            logger.error("Error",{err});
            return res.status(500).json({
                message: err.toString()
            });
        }
    }
}
