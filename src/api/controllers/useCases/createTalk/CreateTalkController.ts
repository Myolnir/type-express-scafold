import * as express from "express";
import {logger} from "../../../shared/logger";
import CreateTalkService from "../../../../contexts/core/user/application/CreateTalkService";

export class CreateTalkController {

    constructor(private readonly createTalkService: CreateTalkService) {
        this.createTalkService = createTalkService;
    }

    async execute (req: express.Request, res: express.Response): Promise<void | any> {
        logger.debug("Talk create controller", {payload: req.body});
        try {
            const {name, description, talkDate, ponentes, duration} = req.body;
            // {
            //     "name": "talk name",
            //     "description": "nodejs for begginers",
            //     "talkDate": '2020-07-07',
            //      "duration": 2,
            //     "ponentes": ["angel", "daniel"],
            // }
            if(!name || !description || !talkDate || !ponentes || !duration) {
                return res.status(400).json({
                    message: "Fields name, description, talkDate, duration and ponentes are required",
                });
            }
            const talk = await this.createTalkService.execute(req.body);
            return res.status(200).json(talk);
        } catch (err) {
            logger.error("Error",{err});
            return res.status(500).json({
                message: err.toString()
            });
        }
    }
}
