import {Result} from "./Result";
import { uuid } from "uuidv4";


export default class User {
  private _id: string;
  private _name: string;
  private _description: string;
  private _createdAt: Date;
  private _modifiedAt: Date;
  private _deletedAt: Date;

  constructor(id: string, name: string, description?: string) {
    this._id = id;
    this._name = name;
    this._description = description;
    this._createdAt = new Date();
  }

  public static createUser(name: string, description: string): Result<User> {
    if (!User.isValidName(name)) {
      return Result.fail<User>("Name is not valid. Length should be between 3 and 20");
    }

    if (!User.isValidDescription(description)) {
      return Result.fail<User>("Description length is not valid. Length should be lower or equal than 125");
    }
    return Result.ok<User>(new User(uuid(), name, description));
  }

  private static isValidName(name: string) {
    return name.length >= 3 && name.length <= 20;
  }

  private static isValidDescription(description: string) {
    return description.length <= 125;
  }


  get id(): string {
    return this._id;
  }

  get name(): string {
    return this._name;
  }

  get description(): string {
    return this._description;
  }

  get createdAt(): Date {
    return this._createdAt;
  }

  get modifiedAt(): Date {
    return this._modifiedAt;
  }

  get deletedAt(): Date {
    return this._deletedAt;
  }
}
