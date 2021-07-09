# `iocord.ts`
> *a new, and very simple discord library written in Typescript.*

**WARNING: NOT RELEASED YET! VERY (possibly) BOILERPLATE & UNFINISED CODE AHEAD!**

Repo: [technorav3nn/deathblows-iocord.ts: a wip discord library, currently very boilerplate. (github.com)](https://github.com/technorav3nn/deathblows-iocord.ts)

Currently able to:
> Receive Messages
> Send Messages

*will be updated regularly*

Changes about to be finished (not pushed to main repo):
> Client class: `Client`,
> TextBasedChannel: `TextBasedChannel`
> DiscordMessage: `DiscordMessage` ([Discord Developer Docs — Channel](https://discord.com/developers/docs/resources/channel#message-object))

*Methods*
> Client class (extends EventEmitter), implements IClient:
* EVENTS:
	* `messageCreate(DiscordMessage)`
	* `More soon!`
* `connect({ token: string }) -> Promise<void>`
* `constructor:`
	* `intents`: not done
> TextBasedChannel class, implements ITextBasedChannel:
* `createMessage(channelID, content) -> Promise<DiscordMessage> // WILL BE EDITED. channel.send()) is the desired method, for now we have this.`
* `deleteMessage(channelID) -> Promise<DiscordMessage> (like createMessage, will be edited.)`
> DiscordMessage class, implements IDiscordMessage:
* read link above

**NOT DONE!**

*Licensed under the MIT License*

*v0.01*
