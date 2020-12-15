const LikeModel = require('../models/Like');

const LikeController = {

    async Create(req, res) {
        try {
            const newLike = await LikeModel.create({
                from: req.body.userId,    //Usuario que da like
                to: req.body._id          //Post que recibe el like
                

            });
            res.send(newLike);
        } catch (error) {
            console.error(error);
            res.status(500).send({
                message: 'There was a problem liking the post',
                error
            })
        }
    }
}

module.exports = LikeController;