import IClient from "../interfaces/IClient";
import IClientOptions from "../interfaces/options/IClientOptions";

export default class Client implements IClient {
  readonly token: string;
  constructor(options: IClientOptions) {
    this.token = options.token;
  }
}
