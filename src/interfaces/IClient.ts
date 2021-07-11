import IRestClient from "./IRestClient";

export interface IClient {
    readonly token: string;
    readonly isConnected: boolean;

    restClient: IRestClient;
}
