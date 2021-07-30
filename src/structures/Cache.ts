import { Snowflake } from "discord-api-types";
import RestClient from "../RestClient";
import { IoSet } from "../util/IoSet";
import { Websocket } from "../Websocket";
import IoStruct from "./IoStruct";
import Message from "./Message";
import TextBasedChannel from "./TextBasedChannel";

export default class Cache extends IoSet<Snowflake, IoStruct> {
    // public guilds : TODO

    public messages: IoSet<Snowflake, Message> = new IoSet<Snowflake, Message>();
    public channels: IoSet<Snowflake, TextBasedChannel> = new IoSet<Snowflake, TextBasedChannel>();

    public rest: RestClient;
    public ws: Websocket;
    constructor(rest?: RestClient, ws?: Websocket) {
        super();

        this.rest = rest ?? null;
        this.ws = ws ?? null;
    }
}
