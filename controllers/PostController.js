const PostModel = require('../models/Post');

const PostController = {


    async Create(req, res) {
        try {
            const post = await PostModel.create(req.body);
            res.send(post);
        } catch (error) {
            console.error(error);
            res.status(500).send({
                message: 'User already exists',
                error
            })
        }
    }

}


module.exports = PostController;