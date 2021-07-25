export enum GatewayOpCodes {
    EVENT_DISPATCH = 0, // Dispatches an event
    HEARTBEAT = 1, // Used for ping checking
    IDENTIFY = 2, // Used for client handshake
    STATUS_UPDATE = 3, // Used to update client status
    VOICE_UPDATE = 4, // Used to join/move/leave voice channels
    VOICE_PING = 5, // Used for voice ping checking
    RESUME = 6, // Used to resume a closed connection
    RECONNECT = 7, // Used to tell clients to reconnect to the gateway
    REQUEST_GUILD_MEMBERS = 8, // Used to request guild members
    INVALID_SESSION = 9, // Used to notify client they have an invalid session id
    HELLO = 10, // sent immediately after connecting, contains heartbeat and server debug information
    HEARTBEAT_ACK = 11, // sent immediately following a client heartbeat that was received
}
