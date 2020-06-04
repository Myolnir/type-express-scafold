import CreateUserService from "../../../contexts/core/user/application/CreateUserService";
import {CreateUserController} from "./createUser/CreateUserController";
import {MongoUserRepository} from "../../../contexts/core/user/infrastructure/MongoUserRepository";
import {config} from "../../../config";


const userRepository = new MongoUserRepository(config);
const createUserService = new CreateUserService(userRepository);
const createUserController = new CreateUserController(createUserService);

export { createUserController };
