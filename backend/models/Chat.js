const mongoose = require('mongoose');

const ChatSchema = new mongoose.Schema({
    fromuser: {
        type:String,
    },
    room: {
        type:String,
    },
    message: {
        type:String,
    },
    datasent: {
            type: Date,
            default: Date.now()
    },

});

const chat = mongoose.model('Chat', ChatSchema)

module.exports = chat