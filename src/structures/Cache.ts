import { Snowflake } from "discord-api-types";
import RestClient from "../RestClient";
import { IoSet } from "../util/IoSet";
import { Websocket } from "../Websocket";
import Guild from "./Guild";
import { GuildMember } from "./GuildMember";
import IoStruct from "./IoStruct";
import Message from "./Message";
import TextBasedChannel from "./TextBasedChannel";
import { User } from "./User";

export default class Cache extends IoSet<Snowflake, IoStruct> {
    // public guilds : TODO

    public messages: IoSet<Snowflake, Message> = new IoSet<Snowflake, Message>();
    public channels: IoSet<Snowflake, TextBasedChannel> = new IoSet<Snowflake, TextBasedChannel>();
    public guilds: IoSet<Snowflake, Guild> = new IoSet<Snowflake, Guild>();
    public users: IoSet<Snowflake, User> = new IoSet<Snowflake, User>();
    public members: IoSet<Snowflake, GuildMember> = new IoSet<Snowflake, GuildMember>();
    public rest: RestClient;
    public ws: Websocket;

    constructor(rest?: RestClient, ws?: Websocket) {
        super();

        this.rest = rest ?? null;
        this.ws = ws ?? null;
    }
}
