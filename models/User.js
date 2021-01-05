const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const {ObjectId} = mongoose.Schema.Types
const UserSchema = new mongoose.Schema({

    name: {
        type: String,
        require: true
    },
    surname: {
        type: String,
        require: true
    },
    age: {
        type: Number,
        require: true
    },
    email: {
        type: String,
        unique: true,
        require: true
    },
    password: {
        type: String,
        require: true
    },
    address: {
        type: String
    },
    bio: {
        type: String
    },
    photo: {
        type: String,
        default: 'https://images.megapixl.com/642/6421863.jpg'
      },
    token: {
        type: String
    },
    role: {
        type: String,
        enum: ['user', 'admin'],
        default: 'user'
    },
    followers: [{
        UserId: { type: ObjectId, ref: 'User'},
        name: String,
        surname: String
        
      }],
      followCount: {
          type: Number
      },
      following: [{
        UserId: { type: ObjectId, ref: 'User'},
        name: String,
        surname: String
        
      }]
    
});

UserSchema.methods.toJSON = function () {
    const user = this.toObject();
    delete user.__v;
    
    return user;
};

UserSchema.pre('save', async function (next) {
    try {

        const user = this;
        user.password = await bcrypt.hash(user.password, 9);
        next()
    } catch (error) {
        console.error(error)
    }
});

const UserModel = mongoose.model("User", UserSchema);
module.exports = UserModel;