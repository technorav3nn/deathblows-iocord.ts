import EventEmitter from "events";
import WebSocket from "ws";
import { IClient } from "./interfaces/IClient";

class Websocket extends EventEmitter {
    public client: IClient;
    public ws: WebSocket;

    constructor(client: IClient) {
        super();
        this.ws = null;
        this.client = client;

        this.connect();
    }

    async connect() {
        this.ws = new WebSocket("wss://gateway.discord.gg/?v=9&encoding=json");
    }
}
