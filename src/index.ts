import WebSocket from "simple-websocket";
import fetch from "node-fetch";

const ws: WebSocket = new WebSocket("wss://gateway.discord.gg/?v=9&encoding=json");

const token: string = "ODYxMjcxNjM2OTA3OTE3MzIy.YOHXtw.PPC_cIndeDOhQeI57FxUwDNG4m0";
const payload: object = {
  op: 2,
  d: {
    token: token,
    intents: 513,
    properties: {
      $os: "linux",
      $browser: "chrome",
      $device: "chrome",
    },
  },
};

let interval: any = 0;

ws.on("connect", function () {
  ws.send(JSON.stringify(payload));
  console.log("Connected");
});
ws.on("data", async (data) => {
  console.log(`Recieved data: ${data}`);
  const payload = JSON.parse(data);
  const { t, event, op, d } = payload;

  switch (op) {
    case 10:
      const { heartbeat_interval } = d;
      interval = getHeartbeat(heartbeat_interval);
      break;
  }
  switch (t) {
    case "MESSAGE_CREATE":
      // const author = d.author.username;
      // const content = d.content;
      if (d.content === "!test") {
        await createMessage(d.channel_id, `Pong! You said it ${d.author.username}!`);
      }
      break;
  }
});

function getHeartbeat(ms: number) {
  return setInterval(() => {
    ws.send(JSON.stringify({ op: 1, d: null }));
  }, ms);
}

async function createMessage(channelID: number, content: string) {
  const url = `https://discord.com/api/v8/channels/${channelID}/messages`;

  const res = await fetch(url, {
    method: "POST",
    headers: {
      Authorization: `Bot ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      content: content,
      tts: false,
    }),
  });
  const json = res.json();

  return json;
}
