var express = require('express');
var router = express.Router();
var chat = require('../chat');

var messages = chat.messages;

router.get('/', async function (req, res, next) {
  const getMessages = async (chatHistory) => {
    await chatHistory.find({}).toArray(async function (err, result) {
      if (err) throw err;
      await result.forEach(value => {
        const message = {
          id: value._id,
          user: value.user,
          value: value.value,
          time: value.time
        };
        messages[value._id] = message;
      });
      res.send(messages);
    });
  };
  try {
    await getMessages(chatHistory);
  } catch (error) {
    console.error(error);
    console.error("Please wait until you are connected to the DB successfully");
  }
});

router.get('/deleteAllMessages', async function (req, res, next) {
  try {
    await chatHistory.deleteMany({});
    res.send('Deleted All Messages');
  } catch (error) {
    console.error(error);
    console.error("Please wait until you are connected to the DB successfully");
  }

});

module.exports = router;
