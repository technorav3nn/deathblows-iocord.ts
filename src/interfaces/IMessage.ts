import TextBasedChannel from "./ITextBasedChannel";

export default interface Message {
  readonly channel: TextBasedChannel;
  // TODO: readonly guild: Guild; // add guild class.
}
