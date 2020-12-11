const UserModel = require('../models/User');
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken');


const UserController = {
    
 async Register(req, res) {  
        try {
        const user = await UserModel.create(req.body);
        res.send(user);
       } catch (error){
           console.error(error);
           res.status(500).send({message: 'User already exists', error})
       }
}


}


module.exports = UserController;