const UserModel = require('../models/User');
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken');


const UserController = {


    async Create(req, res) {
        try {
            const user = await UserModel.create(req.body);
            res.send(user);
        } catch (error) {
            console.error(error);
            res.status(500).send({
                message: 'User already exists',
                error
            })
        }
    },

    async Read(req, res) {
        try {
            const token = req.header('Authorization').replace('Bearer ', '');
            let user = await UserModel.findOne({
                token: token
            });


            res.send(user);

        } catch (error) {
            console.log(error)
            res.status(500).send({
                message: 'Something went wrong updating'
            });
        }
    },

    async Update(req, res) {
        try {
            const token = req.header('Authorization').replace('Bearer ', '');
            let user = await UserModel.findOneAndUpdate({
                token: token
            }, req.body, {
                new: true
            });


            res.send(user);

        } catch (error) {
            console.log(error)
            res.status(500).send({
                message: 'Something went wrong updating'
            });
        }
    },

    async Delete(req, res) {
        try {
            const token = req.header('Authorization').replace('Bearer ', '');
            const user = await UserModel.findOneAndDelete({
                token: token
            });
            res.send({
                message: "User successfully deleted",
                user
            })
        } catch (error) {
            console.error(error);
            res.status(500).send({
                message: "Something went wrong deleting user",
                error
            })
        }
    },

    async Login(req, res) {
        let userFound = await UserModel.findOne({email: req.body.email})
        if (!userFound) {
            res.status(404).send({
                message: "You're not registered",
            })
        } else {
            const isMatch = await bcrypt.compare(req.body.password, userFound.password);
            if (isMatch) {

                const token = jwt.sign({
                    _id: userFound._id
                }, "mymotherpetsme", {
                    expiresIn: '30d'
                })
                userFound.token = token;
                await userFound.replaceOne(userFound);
                res.send(userFound);
                
            } else {
                return res.status(400).send({
                    message: "Token error"
                })
            }
        }
    },

    async Logout(req, res) {
        try {
            const token = req.header('Authorization').replace('Bearer ', '');

            await UserModel.findOneAndUpdate({
                token: token
            }, {
                token: null
            });

            res.send({
                message: 'Session finished'
            });

        } catch (error) {
            console.log(error)
            res.status(500).send({
                message: 'Something went wrong logging out'
            });
        }
    },

    async Follow (req, res) {
        try{
            const token = req.header('Authorization').replace('Bearer ', '');   //Busco al usuario logueado con token
            let user = await UserModel.findOne({
                token: token
            });
          let result = await UserModel.findByIdAndUpdate(req.params._id, {$push: {followers: user._id}}, {new: true})  // Populo con el _id de user el array de "followers" del usuario seguido.
                                  .populate('followers', '_id name surname')
                                  .exec()
        let resultOK = await UserModel.findByIdAndUpdate(user._id, {$push: {following: req.params._id}}, {new: true})  // Populo con el id del usuario seguido el array de "following" de user.
                                  .populate('following', '_id name surname')
                                  .exec()
            res.send(resultOK)
          }catch(error) {
            res.status(500).send({
              message: "Something went wrong following this user"
            })
          }  
      },

      async Unfollow (req, res) {
        try{
            const token = req.header('Authorization').replace('Bearer ', '');   //Busco al usuario logueado con token
            let user = await UserModel.findOne({
                token: token
            });
          let result = await UserModel.findByIdAndUpdate(req.params._id, {$pull: {followers: user._id}}, {new: true})  // Populo con el _id de user el array de "followers" del usuario seguido.
                                  .populate('followers', '_id name')
                                  .exec()
          await UserModel.findByIdAndUpdate(user._id, {$pull: {following: req.params._id}}, {new: true})  // Populo con el id del usuario seguido el array de "following" de user.
                                  .populate('following', '_id name')
                                  .exec()
            res.send(result)
          }catch(error) {
            res.status(500).send({
              message: "Something went wrong following this user"
            })
          }  
      },

      

    async ReadAll(req, res) {
        try {
            const users = await UserModel.find();
            res.send(users);
        } catch (error) {
            console.error(error);
            res.status(500).send({
                message: 'Something went wrong collecting users'
            })
        }
    }

}


module.exports = UserController;