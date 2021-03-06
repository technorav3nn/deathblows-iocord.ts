import { EventEmitter } from "events";
import { IClient } from "../interfaces/IClient";
import IRestClient from "../interfaces/IRestClient";
import RestClient from "../RestClient";
import {
    APIApplication,
    APIChannel,
    APIMessage,
    RESTPostAPIChannelMessageJSONBody,
    RESTPostAPIChannelMessageResult,
    Snowflake,
} from "discord-api-types";
import { Websocket as ws } from "../Websocket";
import Cache from "../structures/Cache";
import Message from "../structures/Message";
import TextBasedChannel from "../structures/TextBasedChannel";
import { IMessageBody } from "../interfaces/IMessageBody";

class Client extends EventEmitter implements IClient {
    public token: string;
    public isConnected: boolean;

    public rest: IRestClient;
    public ws: any;

    public cache: Cache;
    public application: APIApplication;

    [x: string]: any;

    constructor(opts) {
        super();

        this.token = opts.token;
        this.rest = new RestClient(this);
        this.cache = new Cache(this.rest, this.ws);

        this.ws = null;
        this.isConnected = false;
    }

    connect() {
        console.log("Attempting to connect, (iocord)");
        this.ws = new ws(this);
    }

    async send(id: Snowflake, ...options: IMessageBody[]) {
        const res: APIMessage = await this.rest
            .post(`/channels/${id}/messages`, ...options)
            .catch(console.error);

        const msg = new Message({ client: this.client, data: res });
        return msg;
    }

    kill() {
        this.ws.close();
    }

    get messages() {
        return this.cache.messages;
    }
    get channels() {
        return this.cache.channels;
    }
}

export { Client };
