import IRestClient from "./IRestClient";
import WebSocket from "ws";

import EventEmitter from "events";

export interface IClient {
    [x: string]: any;

    readonly token: string;

    isConnected: boolean;

    ws: WebSocket;
    restClient: IRestClient;
}
