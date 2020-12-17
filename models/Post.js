const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const PostSchema = new mongoose.Schema({

    text: {
        type: String,
        required: 'Text is required'
      },
      photo: {
        data: Buffer,
        contentType: String
      },
      likes: [{type: mongoose.Schema.ObjectId, ref: 'User'}],
      likeCount: {
          type: Number
      },
      comments: [{
        text: String,
        created: { type: Date, default: Date.now },
        postedBy: { type: mongoose.Schema.ObjectId, ref: 'User'}
      }],
      postedBy: {type: mongoose.Schema.ObjectId, ref: 'User'},
      created: {
        type: Date,
        default: Date.now
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

const PostModel = mongoose.model("Post", PostSchema);
module.exports = PostModel;