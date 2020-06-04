import User from "../domain/User";
import UserRepository from "../domain/UserRepository";

type CreateUserServiceRequest = {
  id: string;
  name: string;
  description: string;
};

export default class CreateUserService {
  constructor(private repository: UserRepository) {}

  public async execute(req: CreateUserServiceRequest): Promise<User> {
    const { id, name, description } = req;

    const user = new User(id, name, description);

    await this.repository.save(user);

    return user;
  }
}
