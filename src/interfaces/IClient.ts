import IRestClient from "./IRestClient";
import WebSocket from "ws";

import EventEmitter from "events";
import Cache from "../structures/Cache";
import { APIApplication } from "discord-api-types";

export interface IClient {
    [x: string]: any;

    readonly token: string;

    isConnected: boolean;

    application: APIApplication;
    ws: WebSocket;
    rest: IRestClient;
    cache: Cache;

    connect(): void;
}
