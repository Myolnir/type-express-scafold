import Talk from "./Talk";

interface TalkRepository {
  save(user: Talk): Promise<void>;

  find(date: string): Promise<Array<Talk>>;

}

export default TalkRepository;
