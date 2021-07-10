import Message from "./IMessage";
import SendMessageOptions from "./options/ISendMessageOptions";

export default interface TextBasedChannel {
  sendMessage(options: SendMessageOptions): Promise<Message>;
}
