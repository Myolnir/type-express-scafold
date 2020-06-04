import CreateUserService from "../../../contexts/core/user/application/CreateUserService";
import InMemoryUserRepository from "../../../contexts/core/user/infrastructure/InMemoryUserRepository";
import {CreateUserController} from "./createUser/CreateUserController";


const userRepository = new InMemoryUserRepository();
const createUserService = new CreateUserService(userRepository);
const createUserController = new CreateUserController(createUserService);

export { createUserController };
