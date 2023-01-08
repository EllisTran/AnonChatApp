
# Anonymous Chat App Documentation
## Ellis Tran Completed on January 8th, 2023
## In response to an interview with the company Reachify on January 5th, 2023

- The minimum viable product for this code challenge was:
	- Create an anonymous chat web application that runs on node.js and a React front-end
	- One anonymous chat-room
	- Anyone can send messages, and anyone can view messages
	- Messages must appear in realtime for sender and anyone else on the chat
	- Database

- How to use
	- Node.js version v18.0.0
	- Change into the chat-server directory and npm i and npm start should start the chat-server on port 3000. Port number can be changed in bin/www line 29
	- Go into the root directory, run npm i and do an npm start and it will open up the main application on port 8080. Port number can be changed in package.json
	- If you need to clear the database, go to the localhost:port/messages/deleteAllMessages will delete all the messages.

- Tools used
	- Client-side UI: React.js and CSS
		- I used React because react is a great javascript framework to develop beautiful, responsive web applications.
		- I used plain CSS instead of tailwind, materialUI, or other CSS frameworks because even though tailwind and materialUI help make styling easier, I wanted to challenge myself and try to make it using pure CSS.
	- Backend: Node.js, Express.js, and Socket.io
		- I used Node.js and Express.js because they are good frameworks for backend development using JavaScript.
		- Socket.io was used because of the bi-directional communication that web sockets are able to utilize instead of standard HTTP protocols uni-directional communication. This aided greatly in the design of real-time messages appearing in both sender and anyone connected to the application.
	- Database: MongoDB
		- I used MongoDB, because it was quick and easy to setup NoSQL database vs a traditional SQL database. They offer scalability, as well as data being stored as collections and JSON documents; thus, being easy to integrate in JavaScript/Typescript applications.
	- NOTE: I decided to make the React front-end in TS vs JS because of its Type system, allowing for safer and simpler components. In contrast, I did my backend in JS because I am less familiar/experienced with using Types with Node.js/Express.js.

- Feature Implementation
	- This application is simply just a chat room where you can see and send messages. Each user is given an "anon" username.
	- Front-End
		- I went with this UI because I believe simple and intuitive is the best UI.
		- Models
			- AnonUser
				- uid
			- ChatMessageModel
				- userInformation of type AnonUser
				- messageString
				- messageId
				- messageType
					- TEXT type is only applicable at the moment, but can be expanded to images and video.
				- timestamp
		- Components
			- chatRoom.tsx
				- The chatroom is the first component that is rendered. It renders the ChatRoomHeader and ChatFeed components which then renders the rest of the components.
				- On initial render, it creates a unique ID that is 5 characters long which then gets used to create a new AnonUser object. I also open a socket to the local server that is on port 3000. This allows for bi-directional communication between the client and my server.
				- AnonUser gets passed to the ChatRoomHeader and ChatFeed
			- chatRoomHeader.tsx
				- ChatRoomHeader is a component that renders the header component on the ChatRoom and displays the user's unique code
			- chatFeed.tsx
				- ChatFeed is a component that takes in an AnonUser and the current socket. On inital load we make a call to our backend to get all of our messages. This is get request to the backend which waits for the response and then adds all of the messages to our list. As previously discussed in our interview, I tried to use the ".catch" syntax to try and get some practice instead of using try catch.
				- Then we set up our socket to call messageListener whenever 'message' is emitted on our backend or our form submission. MessageListener waits for a message, parses it and adds it to our list of messages that gets displayed to the user.
				- Whenever new messages come, we scroll to the bottom of the page. We also check if it is from a current user. Current users gets shown on the right and are blue, while other users are shown on the left and are a different color.
				- ChatFeed renders the ChatBubble, and MessageInput components.
			
			- chatBubble.tsx
				- The Chat Bubble takes in the AnonUser via userInformation, ChatMessageModel, and the style interface. It renders the name of the user, the message, and the color and position of the chat bubble.
			
			- messageInput.tsx
				- MessageInput renders a form and a SendButton component. On submission it will emit through the socket 'message' which will send to our backend the message, and the anonUser id.

			- sendButton.tsx
				- Renders a reusable button that depends on the formName.
	- Back-End
		- Node.js/Express Backend
			- bin/www
				- Deals with module dependencies
				- Gets port and enviornments and stores in Express.js
				- Creates HTTP server
				- Listens to network
			- app.js
				- Sets up the inital express and db connection to MongoDB. It grabs the db "AnonChatRoom" and collection AnonChatInformation
			- Chat.js
				- Creates the socket connection and receives and emits messages form the client. When it receives a message from the client, it will directly insert the message into the database and then send it to all the users that have an active connection to the socket.
			- Routes
				- /messages
					- This route called by the client  via a GET request, and retrieves all documents in the database. Essentially the chat history is sent to the client.
				- /messages/deleteAllMessages
					- This route will delete all documents in our db collection. Should only be used to clear messages.
	- Database
		- MongoDB holds our collections and our documents pertaining to the chat history.
- Future Plans
	- Abstract MongoDB and Express so that if these become updated or better libraries come around then we can easily change to a different library. And change in one place rather than many.
	- Convert backend to Typescript
	- Implement Video and Image capabilities.

