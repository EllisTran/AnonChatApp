import AnonUser from "./anonUser";

interface ChatMessageModel {
	userInformation: AnonUser,
	messageString: String,
	messageId: number,
	messageType: MessageType,
	timestamp: Date,
}
type MessageType = 'TEXT' | 'IMAGE' | 'VIDEO'; // Future implementation s

export default ChatMessageModel;