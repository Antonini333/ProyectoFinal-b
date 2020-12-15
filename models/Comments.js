const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;

const CommentSchema = new mongoose.Schema({

    from: {
        type: Schema.Types.ObjectId, ref: 'User',
        require: true
    },
    message: {
        type: String,
        require: true
    },
    to: {
        type: Schema.Types.ObjectId, ref: 'Post',
        require: true
    }
});

FollowSchema.methods.toJSON = function () {
    const follow = this.toObject();
    delete follow.__v;
    return follow;
};

const CommentModel = mongoose.model("Comment", CommentSchema);
module.exports = CommentModel;