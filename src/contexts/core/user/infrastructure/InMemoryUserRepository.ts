import User from "../domain/User";
import UserRepository from "../domain/UserRepository";

export default class InMemoryUserRepository implements UserRepository {
  private users: Array<User> = [];

  async save(user: User): Promise<void> {
    await this.delete(user.id);
    this.users.push(user);
  }

  async find(id: string): Promise<User> {
    return this.users.find((user) => user.id === id);
  }

  async delete(id: string): Promise<void> {
    this.users = this.users.filter((user) => user.id !== id);
  }
}
