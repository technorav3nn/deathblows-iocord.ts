import EventEmitter from "events";
import WebSocket from "ws";
import { IClient } from "./interfaces/IClient";
import { GatewayOpCodes as Opcodes } from "./enums/GATEWAY_OPS";

export class Websocket extends EventEmitter {
    public client: IClient;
    public isConnected: boolean;
    private ws: WebSocket;
    public lastEvent: string | object;
    public lastHeartBeat: number;

    constructor(client: IClient) {
        super();
        this.ws = null;
        this.client = client;
        this.isConnected = false;

        this.connect();
    }

    async connect() {
        this.ws = new WebSocket("wss://gateway.discord.gg/?v=9&encoding=json");
        this.client.ws = this.ws;

        this.client.isConnected = true;
        this.init();
    }
    heartbeat(interval: number) {
        //if (!this.client.isConnected) return;

        setInterval(() => {
            this.ws.send(JSON.stringify({ op: 1, d: null }));
        }, interval - 3000); // we add this to make sure, incase its a bit late (hence the "-3000")
    }
    send(op: number, d: string | object) {
        this.ws.send(JSON.stringify({ op, d })); // easier LOL
    }

    identifyClient() {
        return {
            op: 1,
            token: this.client.token,
            intents: 513,
            properties: {
                $properties: "linux",
                $browser: "iocord",
                $device: "iocord",
            },
        };
    }
    init() {
        this.ws.on("open", () => {
            console.log("[IOCORD] opened websocket");
            this.send(2, this.identifyClient());
            console.log("Success for identify? maybe?");
        });

        // Begin gateway

        this.ws.on("message", (message: any) => {
            console.log("Iocord: got message from ws", message);

            const res = JSON.parse(message);
            const { t, event, op, d } = res;

            switch (op) {
                case 10: {
                    const { heartbeat_interval } = d;
                    this.heartbeat(heartbeat_interval);
                    console.log("Received hello event");
                    break;
                }
                case 0: {
                    switch (t) {
                        case "READY":
                            console.log("iocord: Client is ready!");
                            this.send(1, this.lastEvent);

                            this.client.emit("ready", d);
                            break;
                        case "MESSAGE_CREATE": {
                            console.log("Got message create!");
                            break;
                        }
                    }
                    break;
                }
            }
        });
    }
}
