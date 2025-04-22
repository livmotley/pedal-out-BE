const express = require("express");
const { postNewMessage, getAllMessages, findAllChatsByUserId } = require("../controllers/mongodb/chat.controllers.js");

const chatsRouter = express.Router();

chatsRouter
.route('/:chatId')
.get(getAllMessages)
.post(postNewMessage);

chatsRouter
.route('/')
.get(findAllChatsByUserId)
.post(postNewMessage);

module.exports = chatsRouter;
