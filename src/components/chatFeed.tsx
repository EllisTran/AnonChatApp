import React, { useEffect, useRef, useState } from "react";
import ChatMessageModel from "../model/chatMessageModel";
import ChatBubble from "./chatBubble";
import '../index.css';
import MessageInput from "./messageInput";
import AnonUser from "../model/anonUser";
import { Socket } from 'socket.io-client';

interface ChatMessages {
	currentUser: AnonUser;
	socket: Socket;
}
let ChatFeed: React.FC<ChatMessages> = ({ currentUser, socket }) => {
	let [messages, setMessages] = useState<{}>({});
	const messagesEndRef = useRef<null | HTMLDivElement>(null);

	useEffect(() => {
		const messageListener = (message: any) => {
			let newAnonUser: AnonUser = {
				uid: message.user
			}
			const newMessage: ChatMessageModel = {
				userInformation: newAnonUser,
				messageString: message.value,
				messageType: "TEXT",
				messageId: message.time,
				timestamp: new Date(message.time),
			};

			setMessages((prevMessages) => ({ ...prevMessages, [newMessage.messageId]: newMessage }));
		};

		socket.on('message', messageListener);

		const getAllMessages = async () => {
			await fetch('http://localhost:3000/messages').then(async (response) => {
				if (response.ok) {
					const data = await response.json();
					Object.values(data).forEach((value: any) => {
						messageListener(value);
					});
					return;
				}
				return Promise.reject(Error('error'));
			}).catch((error) => {
				console.error(error);
			});

		};

		getAllMessages();
		return () => {
			socket.off('message', messageListener);
		};
	}, [socket]);

	const scrollToBottom = () => {
		messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
	}

	let isCurrentUser = (message: ChatMessageModel) => {
		return message.userInformation.uid === currentUser.uid;
	}

	useEffect(() => { scrollToBottom(); }, [messages]);


	let getChatBubbleSide = (message: ChatMessageModel) => {
		if (isCurrentUser(message)) {
			return 'flex-end';
		}
		return 'flex-start';
	}

	let getChatBubbleColor = (message: ChatMessageModel) => {
		return isCurrentUser(message) ? '#7895B2' : '#554994';
	}

	return (
		<div >
			<div className="chat-feed-container">
				{
					[...Object.values(messages)].map((message: any, index) => {
						let side = getChatBubbleSide(message);
						let bgColor = getChatBubbleColor(message);
						return (
							<div key={index} style={{ alignSelf: side }}>
								<ChatBubble userInformation={message.userInformation} messageString={message.messageString} messageId={message.messageId} messageType={message.messageType} timestamp={message.timestamp} color={bgColor} position={side} />
							</div>
						);
					})}
				<div ref={messagesEndRef}></div>
			</div>
			<MessageInput socket={socket} currentUser={currentUser} />

		</div>


	);
}

export default ChatFeed;