const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const LikeSchema = new mongoose.Schema({

    from: {
        type: Schema.Types.ObjectId, ref: 'User',
        require: true
    },
    to: {
        type: Schema.Types.ObjectId, ref: 'Post',
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