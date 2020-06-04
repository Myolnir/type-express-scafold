export default class TalkNotExist extends Error {
  constructor(id: string) {
    super(`Talk <${id}> does no exist`);
  }
}
