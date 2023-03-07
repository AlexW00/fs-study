export enum SocketEvent {
	Connect = "connect",
	Disconnect = "disconnect",
	SendAuth = "auth",
	SendCreateAuth = "createAuth",
	ReceiveAuth = "receiveAuth",
	ReceiveFailedAuth = "receiveFailedAuth",
	Test = "test",
	PostAnswer = "postAnswer",
	ReceiveTaskProgressUpdate = "receiveTaskProgress",
	Unpaired = "unpaired",
	Paired = "paired",
}
