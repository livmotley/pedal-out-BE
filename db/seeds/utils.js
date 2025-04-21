const { connectToDB } = require("../mongodb");

async function generateNewChatId (collection) {
    const chats = await collection.find({},
        {projection: {chatId: 1, _id: 0}})
        .sort({chatId: 1})
        .toArray();

        let highestNumber = 0;

        for(const chat of chats) {
            if(chat.chatId) {
                const match = chat.chatId.match(/chat_(\d+)/);
                if(match && match[1]) {
                    const num = parseInt(match[1], 10);
                    if(!isNaN(num) && num > highestNumber) {
                        highestNumber = num;
                    }
                }
            }
        }

        const nextNumber = highestNumber + 1;
        const paddedNumber = String(nextNumber).padStart(3, '0');
        return {chatId: `chat_${paddedNumber}`};
}

exports.checkChatExists = (username, chatPartner) => {
    const env = process.env.NODE_ENV || 'development';
    const dbName = env === 'test' ? 'live-chat' : 'live-chat-dev'; // make dev version
    let db;
    return connectToDB()
        .then((client) => {
            db = client.db(dbName);
            return findChatId(dbName, db, username, chatPartner)
    }).then((result) => {
        if(!result) {
            const envCollection = dbName === 'live-chat' ? 'chat-room-test' : 'chat-rooms';
            const collection = db.collection(envCollection);
            return generateNewChatId(collection);
        }
        return result.chatId;
    })
}

function findChatId (dbName, db, username, chatPartner) {
    const envCollection = dbName === 'live-chat' ? 'chat-room-test' : 'chat-rooms';
    const collection = db.collection(envCollection);
    return collection.findOne({
        participants: { $all: [username, chatPartner]}
    })
    .then((result) => {
        return result;
    })
}