const { Schema, model } = require('mongoose');

const messageSchema = new Schema({
    content: {
        type: String,
        required: true,
    },
    username: {
        type: Schema.Types.ObjectId,
        ref: 'User',
    },
    conversation: {
        type: Schema.Types.ObjectId,
        ref: 'Conversation',
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

const Message = model('Message', messageSchema);

module.exports = Message;