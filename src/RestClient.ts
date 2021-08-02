import { IClient } from "./interfaces/IClient";
import IRestClient from "./interfaces/IRestClient";
import { USER_AGENT } from "./enums/USER_AGENT";
import fetch from "node-fetch";

const baseUrl = "https://discord.com/api/v9";

export default class RestClient implements IRestClient {
    public readonly client: IClient;

    constructor(client: IClient) {
        this.client = client;
    }
    async get(endpoint: string) {
        try {
            const res = await fetch(baseUrl + endpoint, {
                method: "GET",
                headers: {
                    Authorization: `Bot ${this.client.token}`,
                    "User-Agent": USER_AGENT.BOT,
                    "Content-Type": "application/json",
                },
            });
            const json = await res.json();
            //console.log(json);
            return json;
        } catch (err) {
            return err;
        }
    }
    async put(endpoint: string, data?: object) {
        try {
            const res = await fetch(baseUrl + endpoint, {
                method: "PUT",
                headers: {
                    Authorization: `Bot ${this.client.token}`,
                    "User-Agent": USER_AGENT.BOT,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
            });
            const json = await res.json();
            return json;
        } catch (err) {
            return err;
        }
    }
    async patch(endpoint: string, data?: object) {
        try {
            const res = await fetch(baseUrl + endpoint, {
                method: "PATCH",
                headers: {
                    Authorization: `Bot ${this.client.token}`,
                    "User-Agent": USER_AGENT.BOT,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
            });
            const json = await res.json();
            return json;
        } catch (err) {
            return err;
        }
    }
    async post(endpoint: string, data?: object) {
        try {
            const res = await fetch(baseUrl + endpoint, {
                method: "POST",
                headers: {
                    Authorization: `Bot ${this.client.token}`,
                    "User-Agent": USER_AGENT.BOT,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
            });
            const json = await res.json();
            console.log(json.errors.components["1"].components["0"].custom_id);
            return json;
        } catch (err) {
            return err;
        }
    }
    async delete(endpoint: string, data?: object) {
        try {
            const res = await fetch(baseUrl + endpoint, {
                method: "DELETE",
                headers: {
                    Authorization: `Bot ${this.client.token}`,
                    "User-Agent": USER_AGENT.BOT,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
            });
            const json = await res.json();
            return json;
        } catch (err) {
            return err;
        }
    }
}
