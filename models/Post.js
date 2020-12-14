const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;

const PostSchema = new mongoose.Schema({

    post: {
        type: String,
        require: true
    },
    postedBy: {
        type: ObjectId,
        require: true
    },
    date: {
        type: Date
    },
    likes: {
        type: Number
    },
    comments: {
        type: Array
    }
    
});

PostSchema.methods.toJSON = function () {
    const post = this.toObject();
    delete post.__v;
    return post;
};

const PostModel = mongoose.model("post", PostSchema);
module.exports = PostModel;