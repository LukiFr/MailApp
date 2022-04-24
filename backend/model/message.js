const mongoose = require('mongoose');

const MessageSchema = new mongoose.Schema(
    {
        sender: { type: String, required: true },
        receipient: { type: String, required: true },
        message: { type: String, required: true }
    },
    { collection: 'messages' }
)

const model = mongoose.model('MessageSchema', MessageSchema)

module.exports = model