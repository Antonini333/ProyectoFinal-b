const PostModel = require('../models/Post');
const { ObjectId } = require('mongodb');


const PostController = {

 async Create(req, res) {
        try {
            const newPost = await PostModel.create({
                post: req.body.post,
                userId: req.body.userId,
                date: new Date,

            });
            res.send(newPost);
        } catch (error) {
            console.error(error);
            res.status(500).send({
                message: 'Post error',
                error
            })
        }
    },

    async Read (req, res) {
try{
    const readPost = await PostModel.find({
        userId: req.body.userId
    })
    res.send({readPost});
}
catch{
    console.error(error);
    res.status(500).send({
      message: 'There was a problem showing your posts.'
    })
}
    }

}


module.exports = PostController;