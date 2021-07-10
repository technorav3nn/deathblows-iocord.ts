import Message from "../interfaces/IMessage";
import ITextBasedChannel from "../interfaces/ITextBasedChannel";
import SendMessageOptions from "../interfaces/options/ISendMessageOptions";
import BaseStructure from "../structures/BaseStructure";

export default class TextBasedChannel extends BaseStructure implements ITextBasedChannel {
  async sendMessage(options: SendMessageOptions): Promise<Message> {
    return; // TODO: Add message thing lol
  }
}
