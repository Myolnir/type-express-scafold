export default class UserNotExist extends Error {
  constructor(id: string) {
    super(`User <${id}> does no exist`);
  }
}
