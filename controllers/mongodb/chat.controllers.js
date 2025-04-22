const { connectToDB } = require("../../db/mongodb.js");
const { checkChatExists } = require("../../db/seeds/utils.js");
const { addNewMessage, fetchAllMessages, fetchAllChatsByUserId } = require("../../models/mongodb/chats.models.js");

exports.postNewMessage = async (req, res, next) => {
    const env = process.env.NODE_ENV || 'development';
    const dbName = env === 'test' ? 'live-chat' : 'live-chat-dev'; // make dev version
    const { chatPartner, username, message } = req.body;

    await checkChatExists(username, chatPartner)
    .then((chatId) => {
        return addNewMessage(dbName, chatId, chatPartner, message, username);
    })
    .then((result) => {
        res.status(201).send(result)
    })
    .catch((err) => {
        next(err);
    })
}

exports.getAllMessages = (req, res, next) => {
    const env = process.env.NODE_ENV || 'development';
    const dbName = env === 'test' ? 'live-chat' : 'live-chat-dev'; // make dev version
    const { chatId } = req.params;

    connectToDB()
    .then((client) => {
        const db = client.db(dbName);
        return fetchAllMessages(dbName, db, chatId);
    })
    .then((messages) => {

        res.status(200).send(messages);
    })
    .catch((err) => {
        next(err);
    })
}

exports.findAllChatsByUserId = (req, res, next) => {
    const env = process.env.NODE_ENV || 'development';
    const dbName = env === 'test' ? 'live-chat' : 'live-chat-dev'; // make dev version
    const { username } = req.body;


    connectToDB()
    .then((client) => {
        const db = client.db(dbName);
        return fetchAllChatsByUserId(dbName, db, username);
    })
    .then((result) => {
        res.status(200).send({chatIds: result.uniqueIds, chatPartners: result.uniqueChatPartners});
    })
    .catch((err) => {
        next(err);
    })
}