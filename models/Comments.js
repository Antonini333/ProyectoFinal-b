const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;

const CommentSchema = new mongoose.Schema({

    from: {
        type: ObjectId,
        require: true
    },
    message: {
        type: String,
        require: true
    },
    to: {
        type: ObjectId,
        require: true
    }
});

FollowSchema.methods.toJSON = function () {
    const follow = this.toObject();
    delete follow.__v;
    return follow;
};

const FollowModel = mongoose.model("follow", FollowSchema);
module.exports = FollowModel;