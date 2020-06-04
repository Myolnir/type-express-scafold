import { Router } from "express";
import {createUserController} from "../controllers/useCases";

const userRouter: Router = Router();

userRouter.post("/",
    (req, res) => createUserController.execute(req, res));


export {userRouter};
