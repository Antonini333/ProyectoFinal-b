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
                message: 'There was a problem posting',
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
    },

    async Update(req, res) {
        try {
            let updatePost = await PostModel.findOneAndUpdate({
                _id: req.body._id
            }, req.body, {
                new: true
            });
            res.send(updatePost);

        } catch (error) {
            console.log(error)
            res.status(500).send({
                message: 'Something went wrong updating the post'
            });
        }
    },

    async Delete(req, res) {
        try {
            let deletePost = await PostModel.findOneAndDelete({
                _id: req.body._id
            });
            res.send({
                message: "Post successfully deleted",
                deletePost
            });

        } catch (error) {
            console.log(error)
            res.status(500).send({
                message: 'Something went wrong deleting the post'
            });
        }
    },

    async ReadAll(req, res) {
        try {
            const allPosts = await PostModel.find();
            res.send(allPosts);
        } catch (error) {
            console.error(error);
            res.status(500).send({
                message: 'Something went wrong collecting the posts'
            })
        }
    }

}


module.exports = PostController;