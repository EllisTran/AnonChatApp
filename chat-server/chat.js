const uuidv4 = require('uuid').v4;
var express = require('express');
const messages = new Set();
const users = new Map();

const messageExpirationTimeMS = 5 * 60 * 1000;

class Connection {
	constructor(io, socket) {
		this.socket = socket;
		this.io = io;

		socket.on('message', (value) => this.handleMessage(value));
		socket.on('disconnect', () => this.disconnect());
		socket.on('connect_error', (err) => {
			console.log(`connect_error due to ${err.message}`);
		});
	}


	async sendMessage(message) {
		// Save to DB
		try {
			await chatHistory.insertOne(message, function (err, res) {
				if (err) throw err;
				console.log("1 document inserted");
				// db.close();
			});
			this.io.sockets.emit('message', message);
		} catch (error) {
			console.error(error);
			console.error("Please wait until successfully connected to DB");
		}

	}

	handleMessage(value) {
		const message = {
			id: uuidv4(),
			user: value.anonUser,
			value: value.message,
			time: Date.now()
		};

		messages.add(message);
		this.sendMessage(message);

		setTimeout(
			() => {
				messages.delete(message);
				this.io.sockets.emit('deleteMessage', message.id);
			},
			messageExpirationTimeMS,
		);
	}

	disconnect() {
		users.delete(this.socket);
	}
}

function chat(io) {
	io.on('connection', (socket) => {
		new Connection(io, socket);
	});
};

module.exports = { chat, messages };
