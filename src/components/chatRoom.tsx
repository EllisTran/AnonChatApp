import React, { useState, useEffect } from "react";
import AnonUser from "../model/anonUser";
import ChatFeed from "./chatFeed";
import ChatRoomHeader from "./chatRoomHeader";
import io, { Socket } from 'socket.io-client';
import '../index.css';

// When I first enter my application I want to create a new UID
let ChatRoom = () => {
	let [user, setUser] = useState<AnonUser>();
	const [socket, setSocket] = useState<Socket>();

	let generateNewUID = () => {
		let length = 5;
		let result = '';
		let characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
		let charactersLength = characters.length;
		for (var i = 0; i < length; i++) {
			result += characters.charAt(Math.floor(Math.random() * charactersLength));
		}
		const anonUser: AnonUser = {
			uid: result
		};
		setUser(anonUser);
	}

	useEffect(() => {
		const setup = async () => {
			await generateNewUID();
		};

		setup();
	}, []);

	useEffect(() => {
		const newSocket = io(`http://${window.location.hostname}:3000`);
		setSocket(newSocket);

		return () => { newSocket.close(); }
	}, [setSocket]);


	return (
		<div className="chat-room-container">
			{socket ? (
				<div className="chat-container">
					<ChatRoomHeader uid={user?.uid} />
					<ChatFeed currentUser={user!} socket={socket} />
				</div>
			) : (
				<div>Not Connected</div>
			)}

		</div>
	);
}

export default ChatRoom;