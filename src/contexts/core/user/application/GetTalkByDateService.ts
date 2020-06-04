import {logger} from "../../../../api/shared/logger";
import TalkRepository from "../domain/TalkRepository";
import Talk from "../domain/Talk";

export class GetTalkByDateService {

    constructor(private readonly talkRepository: TalkRepository){}

    async execute(talkDate: string): Promise<Array<Talk>> {
        logger.info("Get talk by date service", {talkDate});
        return await this.talkRepository.find(talkDate);
    }
}
