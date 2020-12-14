const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const PostSchema = new mongoose.Schema({

    post: {
        type: String,
        require: true
    },
    userId: {
        type: Schema.Types.ObjectId, ref: 'User',
        require: true
    },
    date: {
        type: Date
    },
    likes: {
        type: Number,
        default: 0
    },
    comments: {
        type: Array,
    }
    
});

PostSchema.post("find",async function(docs){
    for (let doc of docs) {
        await doc.populate("postedBy").execPopulate();
    
    }
})

PostSchema.methods.toJSON = function () {
    const post = this.toObject();
    delete post.__v;
    return post;
};

const PostModel = mongoose.model("post", PostSchema);
module.exports = PostModel;