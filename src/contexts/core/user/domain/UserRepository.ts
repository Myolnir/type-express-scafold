import User from "./User";

interface UserRepository {
  save(user: User): Promise<void>;

  find(id: string): Promise<User>;

  delete(id: string): Promise<void>;
}

export default UserRepository;
