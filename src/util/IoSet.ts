import IoStruct from "../structures/IoStruct";
import { Snowflake } from "discord-api-types";
import { Collection } from "@discordjs/collection";

export class IoSet<K, V> extends Collection<K, V> {}
