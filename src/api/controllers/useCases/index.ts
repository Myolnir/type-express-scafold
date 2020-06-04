import CreateTalkService from "../../../contexts/core/user/application/CreateTalkService";
import {CreateTalkController} from "./createTalk/CreateTalkController";
import InMemoryUserRepository from "../../../contexts/core/user/infrastructure/InMemoryUserRepository";
import {GetTalkByDateService} from "../../../contexts/core/user/application/GetTalkByDateService";
import {GetTalkByDateController} from "./getTalkByDate/GetTalkByDateController";


const talkRepository = new InMemoryUserRepository();
const createTalkService = new CreateTalkService(talkRepository);
const createTalkController = new CreateTalkController(createTalkService);

const getTalkByDateService = new GetTalkByDateService(talkRepository);
const getTalkByDateController = new GetTalkByDateController(getTalkByDateService);

export { createTalkController, getTalkByDateController };
