import { Router } from "express";
import {createTalkController, getTalkByDateController} from "../controllers/useCases";

const talkRouter: Router = Router();

talkRouter.post("/",
    (req, res) => createTalkController.execute(req, res));
talkRouter.get("/",
    (req, res) => getTalkByDateController.execute(req, res));


export {talkRouter};
