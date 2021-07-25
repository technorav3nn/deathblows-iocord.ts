import { EventEmitter } from "events";
import { IClient } from "../interfaces/IClient";
import IRestClient from "../interfaces/IRestClient";
import RestClient from "../RestClient";
import { Websocket as ws } from "../Websocket";

class Client extends EventEmitter implements IClient {
    public token: string;
    public isConnected: boolean;

    restClient: IRestClient;
    ws: any;

    [x: string]: any;

    constructor(opts) {
        super();

        this.token = opts.token;
        this.restClient = new RestClient(this);

        this.ws = null;
        this.isConnected = false;
    }

    connect() {
        console.log("Attempting to connect, (iocord)");
        this.ws = new ws(this);
    }

    async send(id: number, message: string) {
        const res = await this.restClient.post(`/channels/${id}/messages`, {
            message,
        });
        return res;
    }

    kill() {
        this.ws.close();
    }
}

export { Client };
