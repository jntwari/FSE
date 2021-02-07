import mongoose from 'mongoose';

const messageSchema = mongoose.Schema(
    {
        user:
        {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'users'
        },

        senderName:
        {
            type: String,
            required: true
        },

        content:
        {
            type: String,
            required: true,
        },

        date:
        {
            type: Date,
            required: true
        },

    }
);

const message = mongoose.model('message', messageSchema);

export default message;