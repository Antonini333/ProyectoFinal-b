const PostModel = require('../models/Post');
const UserModel = require('../models/User');
const { ObjectId } = require('mongodb');


const PostController = {

    

 async Create(req, res) {
        try {
            const token = req.header('Authorization').replace('Bearer ', '');   //Busco al usuario logueado con token
            let user = await UserModel.findOne({
                token: token
            });
            const newPost = await PostModel.create({
                text: req.body.text,
                postedBy: user._id,
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
    const token = req.header('Authorization').replace('Bearer ', '');   //Busco al usuario logueado con token
            let user = await UserModel.findOne({
                token: token
            });
    const readPost = await PostModel.find({
        postedBy: user._id
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
                _id: req.body.postId
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
                _id: req.body.PostId
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
    },

    async Like (req, res) {
        try{
            const token = req.header('Authorization').replace('Bearer ', '');   //Busco al usuario logueado con token
            let user = await UserModel.findOne({
                token: token
            });
          let findPost = await PostModel.findByIdAndUpdate(req.body.postId,  { $push: { 
            likes: user._id
          },
     $inc: { likeCount: 1 } 
  }, {new: true });
        
            res.send(findPost)
          }catch(error) {
            res.status(500).send({
              message: "Something went wrong liking this post"
            })
          }  
    },

    async Unlike (req, res) {
        try{
            const token = req.header('Authorization').replace('Bearer ', '');   //Busco al usuario logueado con token
            let user = await UserModel.findOne({
                token: token
            });
          let findPost = await PostModel.findByIdAndUpdate(req.body.postId, {$pull: {likes: user._id}}, {new: true})  // Extraigo el _id de user el array de "likes" del post.
                                  .populate('likes', '_id name')
                                  .exec()
        
            res.send(findPost)
          }catch(error) {
            res.status(500).send({
              message: "Something went wrong liking this post"
            })
          }  
    },

    async Comment (req, res) {
        try{
            const token = req.header('Authorization').replace('Bearer ', '');   //Busco al usuario logueado con token
            let user = await UserModel.findOne({
                token: token
            });
            let findPost = await PostModel.findByIdAndUpdate(req.body.postId,  { $push: { 
                comments: {
                  "text" : req.body.text,
                  "postedBy" : user._id
                  }  
              },
         $inc: { commentCount: 1 } 
      }, {new: true });
      res.send(findPost)
          }catch(error) {
            res.status(500).send({
              message: "Something went wrong liking this post"
            })
          }  
    },

}


module.exports = PostController;