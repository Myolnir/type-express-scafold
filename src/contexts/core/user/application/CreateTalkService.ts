import Talk from "../domain/Talk";
import TalkRepository from "../domain/TalkRepository";
import {logger} from "../../../../api/shared/logger";

type CreateTalkServiceRequest = {
  id: string;
  name: string;
  description: string;
  ponentes: Array<string>;
  duration: number;
  talkDate: string;
};

export default class CreateTalkService {
  constructor(private repository: TalkRepository) {
  }

  public async execute(req: CreateTalkServiceRequest): Promise<Talk> {
    const {name, description, ponentes, talkDate, duration} = req;
    const talk = new Talk(name, description, ponentes, talkDate, duration);
    const finishTalkHour: number = await this.calculateTalkHours(duration, talkDate);
    talk.finishTalkHour = finishTalkHour;
    talk.initTalkHour = finishTalkHour - duration;
    await this.repository.save(talk);
    return talk;
  }

  private async calculateTalkHours(duration: number, talkDate: string): Promise<number> {
    logger.info ("Calculando la hora de fin");
    const dia1 = "2020-06-05";
    const dia2 = "2020-06-06";
    const horaInicioDia1 = 10;
    const horaInicioDia2 = 12;
    const horaFinDia1 = 20;
    const horaFinDia2 = 15;
    const talks: Array<Talk> = await this.repository.find(talkDate);
    const lastDayTalk = talks.pop();

    if(!lastDayTalk) {
      if (talkDate === dia1) {
        logger.info("No hay charlas dadas de alta del dia 1 le asignamos la primera hora");
        return horaInicioDia1 + duration;
      } else {
        logger.info("No hay charlas dadas de alta del dia 2 le asignamos la primera hora");
        return horaInicioDia2 + duration;
      }
    }

    let result: number = lastDayTalk.finishTalkHour + duration;
    if (talkDate === dia1) {
      if (lastDayTalk.finishTalkHour + duration > horaFinDia1) {
        logger.info("La charla no entra dentro del horario, la ponemos al principio del dia 1");
        result = horaInicioDia1 + duration;
      }
    } else {
      if (lastDayTalk.finishTalkHour + duration > horaFinDia2) {
        logger.info("La charla no entra dentro del horario, la ponemos al principio del dia 2");
        result = horaInicioDia2 + duration;
      }
    }
    return result;
  }
}
