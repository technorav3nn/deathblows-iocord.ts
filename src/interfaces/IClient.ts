import IRestClient from "./IRestClient";
import WebSocket from "ws";

import EventEmitter from "events";
import Cache from "../structures/Cache";

export interface IClient {
    [x: string]: any;

    readonly token: string;

    isConnected: boolean;

    ws: WebSocket;
    rest: IRestClient;
    cache: Cache;

    connect(): void;
}
