import { IClient } from "./IClient";

export default interface IRestClient {
    readonly client: IClient;

    get(endpoint: string): any;
    post(endpoint: string, data: object): any;
    put(endpoint: string, data: object): any;
    patch(endpoint: string, data: object): any;
    delete(endpoint: string, data: object): any;
}
