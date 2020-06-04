import * as express from "express";
import {logger} from "../../../shared/logger";
import {GetTalkByDateService} from "../../../../contexts/core/user/application/GetTalkByDateService";

export class GetTalkByDateController {
    constructor(private readonly getTalkByDateService: GetTalkByDateService) {
    }

    async execute (req: express.Request, res: express.Response): Promise<void | any> {
        logger.info("Get talk controller");
        const talkDate: string = req.query.talkDate as string;
        try {
            const talks = await this.getTalkByDateService.execute(talkDate);
            return res.status(200).json(talks);
        } catch (err) {
            logger.error("Error",{err});
            return res.status(500).json({
                message: err.toString()
            });
        }

    }
}
