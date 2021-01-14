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
                message: 'Something went wrong searching for this user'
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
                message: 'Something went wrong updating your profile'
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

async Logout (req,res) {

    try {
        const token = req.header('Authorization').replace('Bearer ', '');
        let user = await UserModel.findOneAndUpdate({
            token: token
        }, {token: "null"});


        res.send(user);
        } catch (error) {
            console.log(error)
            res.status(500).send({ message: 'Something went wrong logging out' });
        }
    },

    async Follow (req, res) {
        try{
            const token = req.header('Authorization').replace('Bearer ', '');   
            let user = await UserModel.findOne({
                token: token
            });
            let user2 = await UserModel.findOne({
                _id: req.params._id
            })
          let result = await UserModel.findByIdAndUpdate(req.params._id, {$push: {followers: {UserId: user._id, name: user.name, surname: user.surname}}, $inc:{ followCount: 1}}, {new: true})  
                                  .populate('followers', '_id', 'name', 'surname')
                                  .exec()

                                  await UserModel.findByIdAndUpdate(user._id, {$push: {following: {UserId: user2._id, name: user2.name, surname: user2.surname}}}, {new: true})  
                                  .populate('following', '_id', 'name', 'surname')
                                  .exec()
            
            res.send(user)
          }catch(error) {
            res.status(500).send({
              message: "Something went wrong following this user"
            })
          }  
      },

      async Unfollow (req, res) {
        try{
            const token = req.header('Authorization').replace('Bearer ', '');   
            let user = await UserModel.findOne({
                token: token
            });
            let user2 = await UserModel.findOne({
                _id: req.params._id
            })
          let result = await UserModel.findByIdAndUpdate(req.params._id, {$pull: {followers: {UserId: user._id, name: user.name, surname: user.surname}}, $inc:{ followCount: -1}}, {new: true})  // Populo con el _id de user el array de "followers" del usuario seguido.
                                  .populate('followers', '_id', 'name', 'surname')
                                  .exec()

                                  await UserModel.findByIdAndUpdate(user._id, {$pu: {following: {UserId: user2._id, name: user2.name, surname: user2.surname}}}, {new: true})  // Populo con el _id de user el array de "followers" del usuario seguido.
                                  .populate('following', '_id', 'name', 'surname')
                                  .exec()
            res.json(result)
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