import React, { useState } from "react";
import SendButton from "./sendButton";
import { Socket } from 'socket.io-client';
import AnonUser from "../model/anonUser";
interface MessageInputInterface {
	socket: Socket,
	currentUser: AnonUser
}

let MessageInput: React.FC<MessageInputInterface> = ({ socket, currentUser }) => {
	let [message, setMessage] = useState('');

	const submitForm = (e: React.FormEvent) => {
		e.preventDefault();
		if (message === '') return;
		socket.emit('message', {
			'message': message,
			'anonUser': currentUser.uid
		});
		setMessage('');
	};

	return (
		<form onSubmit={(e: React.FormEvent) => submitForm(e)} className="message-input-container" id="messageForm">
			<input type='text' placeholder='Type your message here' className="message-input" value={message} onChange={(e) => { setMessage(e.target.value) }} />
			<SendButton formName="messageForm"/>
		</form>
	);
}

export default MessageInput;