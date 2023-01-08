import React from "react";
import AnonUser from "../model/anonUser";
import '../index.css';
let ChatRoomHeader: React.FC<AnonUser> = ({ uid }) => {
	return (
		<h1 style={{ alignSelf: 'center', textAlign: 'center' }}>
			Welcome to the Anonymous Chat Room: <span style={{ color: '#7895B2' }}>
				 {uid}
			</span>
		</h1>
	);
}

export default ChatRoomHeader;