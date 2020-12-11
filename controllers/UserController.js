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
},

async Login (req,res) {
    let userFound = await UserModel.findOne({
        email: req.body.email
        
    });
    if(!userFound) {
        res.status(400).send({
            message: "Wrong credentials",
    
        })
    }else{
        const isMatch = await bcrypt.compare(req.body.password, userFound.password); 
        if(isMatch){

            const token = jwt.sign({id: userFound.id }, "mymotherpetsme", {expiresIn: '30d'})
            userFound.token = token;
            await userFound.replaceOne(userFound);

            res.send(userFound);
        }else{
            return res.status(400).send({
                message: "Wrong credentials"
            })
        }
    }
}


}


module.exports = UserController;