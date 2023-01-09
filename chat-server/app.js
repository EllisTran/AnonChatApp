var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var messagesRouter = require('./routes/messages');
var app = express();
var cors = require('cors');
app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/messages', messagesRouter);
const mongo = require("mongodb").MongoClient;
const url = 'mongodb+srv://ellisktran:89wj1EQNiNjTQLxO@cluster0.w5lvufi.mongodb.net/?retryWrites=true&w=majority';
let db;
console.log("Connecting to Chat History");
mongo.connect(url, { useNewUrlParser: true, useUnifiedTopology: true, }, (err, client) => {
	if (err) {
		console.error(err)
		return
	}
	db = client.db("AnonChatRoom");
	chatHistory = db.collection("AnonChatInformation");
	console.log("Connected to Chat History!")
}
);


module.exports = app;
