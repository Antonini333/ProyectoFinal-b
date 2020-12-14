const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;

const LikeSchema = new mongoose.Schema({

    from: {
        type: ObjectId,
        require: true
    },
    to: {
        type: ObjectId,
        require: true
    }
});

LikeSchema.methods.toJSON = function () {
    const like = this.toObject();
    delete like.__v;
    return like;
};

const LikeModel = mongoose.model("like", LikeSchema);
module.exports = LikeModel;