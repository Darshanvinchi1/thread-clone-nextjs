import mongoose from "mongoose";

const threadSchema = new mongoose.Schema({
    text: { type: String, require: true },
    auther: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        require: true,
    },
    community: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Community',
    },
    createdAt:{ 
        type: Date,
        default: Date.now,
    },
    parentId:{
        type: String,
    },
    repostedFrom: [
        {
            thread: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Thread',
            },
            repostedBy: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'User',
            },
        }
    ],
    children: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Thread'
        }
    ]
});

const Thread = mongoose.models.Thread || mongoose.model('Thread', threadSchema);

export default Thread;