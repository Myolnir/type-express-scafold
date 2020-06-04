import Talk from "../domain/Talk";
import TalkRepository from "../domain/TalkRepository";
import {logger} from "../../../../api/shared/logger";

export default class InMemoryUserRepository implements TalkRepository {
  private talks: Array<Talk> = [];

  async save(talk: Talk): Promise<void> {
    this.talks.push(talk);
    logger.info("lista de talks", {talks: this.talks});
  }

  async find(date: string): Promise<Array<Talk>> {
    logger.info("Find repository by ", date);
    return this.talks.filter((talk) => {
      logger.info("dentro del filtro", talk);
      return talk.talkDate === date;
    });
  }

}
