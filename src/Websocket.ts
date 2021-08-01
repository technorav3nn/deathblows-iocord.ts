import EventEmitter from "events";
import WebSocket from "ws";
import { IClient } from "./interfaces/IClient";
import { GatewayOpCodes as Opcodes } from "./enums/GATEWAY_OPS";
import Message from "./structures/Message";
import { Client } from "./client/Client";
import { APIChannel, APIGuild, APIMessage } from "discord-api-types";
import TextBasedChannel from "./structures/TextBasedChannel";
import IoCordAPIError from "./util/IoCordAPIError";
import Guild from "./structures/Guild";
import { User } from "./structures/User";
import { GuildMember } from "./structures/GuildMember";

export class Websocket extends EventEmitter {
    public client: Client;
    public isConnected: boolean;
    private ws: WebSocket;
    public lastEvent: string | object;
    public lastHeartBeat: number;

    constructor(client: Client) {
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

        this.ws.on("message", async (message: any) => {
            const res = JSON.parse(message);
            const { op, d, s, t } = res;

            const msg: APIMessage = res;

            switch (op) {
                case 10: {
                    const { heartbeat_interval } = d;
                    this.heartbeat(heartbeat_interval);
                    console.log("Received hello event");
                    break;
                }
                case 0: {
                    if (t === "READY") {
                        this.client.emit("ready", res.d);
                        console.log("DEBUG: READY!");
                    } else if (t === "MESSAGE_CREATE") {
                        const MessageData = new Message({
                            client: this.client,
                            data: res.d,
                        });

                        if (!this.client.cache.channels.has(msg.channel_id)) {
                            const channel: APIChannel = await this.client.rest.get(
                                `/channels/${res.d.channel_id}`
                            );
                            const guild: APIGuild = await this.client.rest.get(
                                `/guilds/${res.d.guild_id}`
                            );

                            if (channel.type === (1 || 2 || 3 || 10 || 11 || 12)) {
                                throw new IoCordAPIError(
                                    "Sorry, dm channels, threads and voice channels arent finished!"
                                );
                            }
                            const CreatedChannel = new TextBasedChannel({
                                client: this.client,
                                data: channel,
                            });
                            const CreatedGuild = new Guild({ client: this.client, data: guild });

                            this.client.cache.channels.set(res.d.channel_id, CreatedChannel);
                            this.client.cache.guilds.set(res.d.guild_id, CreatedGuild);

                            if (!this.client.cache.users.has(res.d.author.id)) {
                                const CreatedUser: User = new User(res.d.author, res.d.author.id);

                                this.client.cache.users.set(res.d.author.id, CreatedUser);
                            }
                        }
                        const CreatedMember = new GuildMember(res.d.member, res.d.author.id);
                        this.client.cache.members.set(res.d.author.id, CreatedMember);

                        this.client.cache.messages.set(MessageData.id, MessageData);
                        this.client.emit("messageCreate", res.d, MessageData);
                        return;
                    }
                    break;
                }
            }
        });
    }
}
