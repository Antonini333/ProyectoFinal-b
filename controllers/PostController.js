const PostModel = require('../models/Post');
const { ObjectId } = require('mongodb');

const PostController = {


    async Create(req, res) {
        try {
            const post = await PostModel.create({
                post: req.body,
                postedBy: ObjectId(req.user._id),
                date: new Date,

            });
            res.send(post);
        } catch (error) {
            console.error(error);
            res.status(500).send({
                message: 'Post error',
                error
            })
        }
    }

}


module.exports = PostController;