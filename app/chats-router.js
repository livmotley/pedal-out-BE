const express = require("express");
const { postNewMessage, getAllMessages, findAllChatsByUserId } = require("../controllers/mongodb/chat.controllers.js");

const chatsRouter = express.Router();

chatsRouter
.route('/:username')
.get(findAllChatsByUserId);

chatsRouter
.route('/:chatId')
.get(getAllMessages)
.post(postNewMessage);

chatsRouter
.route('/')
.post(postNewMessage);

module.exports = chatsRouter;
