import React from "react";
import ChatMessageModel from "../model/chatMessageModel";
import '../index.css';
interface style {
	color: string,
	position: string,
}
let ChatBubble: React.FC<ChatMessageModel & style> = ({ userInformation, messageString, timestamp, color, position }) => {
	return (
		<div className="bubble-container">
			<p  className="name" style={{ alignSelf: position}}>Anon User {userInformation.uid}</p>
			<div className="speech-bubble" style={{backgroundColor: color}}>
				<p>{messageString}</p>
			</div>
			<p className="timestamp" style={{ alignSelf: position}}>{timestamp.toLocaleDateString() + ' ' + timestamp.toLocaleTimeString()}</p>
		</div>
	);
}
export default ChatBubble;