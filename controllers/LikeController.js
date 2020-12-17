const LikeModel = require('../models/Like');
const UserModel = require('../models/User');

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
    },

    async Likear(req,res) {
        const User = await UserModel.findById({
            _id: req.body._id
        });
        User.find({
            'post._id' : req.params._id
        })
    }
}

module.exports = LikeController;