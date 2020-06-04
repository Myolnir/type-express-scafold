import {uuid} from "uuidv4";

export default class Talk {
  private _id: string;
  private _name: string;
  private _description: string;
  private _ponentes: Array<string>;
  private _duration: number;
  private _talkDate: string;
  private _createdAt: Date;
  private _modifiedAt: Date;
  private _deletedAt: Date;
  private _finishTalkHour: number;
  private _initTalkHour: number;


  constructor(name: string, description: string, ponentes: Array<string>, talkDate: string, duration: number) {
    this._id = uuid();
    this._name = name;
    this._description = description;
    this._ponentes = ponentes;
    this._talkDate = talkDate;
    this._duration = duration;
    this._createdAt = new Date();
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

  set createdAt(value: Date) {
    this._createdAt = value;
  }

  get modifiedAt(): Date {
    return this._modifiedAt;
  }

  get deletedAt(): Date {
    return this._deletedAt;
  }

  get ponentes(): Array<string> {
    return this._ponentes;
  }

  set ponentes(value: Array<string>) {
    this._ponentes = value;
  }

  get talkDate(): string {
    return this._talkDate;
  }

  set talkDate(value: string) {
    this._talkDate = value;
  }

  get duration(): number {
    return this._duration;
  }

  set duration(value: number) {
    this._duration = value;
  }

  get finishTalkHour(): number {
    return this._finishTalkHour;
  }

  set finishTalkHour(value: number) {
    this._finishTalkHour = value;
  }


  get initTalkHour(): number {
    return this._initTalkHour;
  }

  set initTalkHour(value: number) {
    this._initTalkHour = value;
  }
}
