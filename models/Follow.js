const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;

const FollowSchema = new mongoose.Schema({

    from: {
        type: Schema.Types.ObjectId, ref: 'User',
        require: true
    },
    to: {
        type: Schema.Types.ObjectId, ref: 'User',
        require: true
    }
});

FollowSchema.methods.toJSON = function () {
    const follow = this.toObject();
    delete follow.__v;
    return follow;
};

const FollowModel = mongoose.model("Follow", FollowSchema);
module.exports = FollowModel;