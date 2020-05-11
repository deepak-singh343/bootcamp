//require mongoose and create schema for user
const mongoose = require('mongoose');
const multer = require('multer');
const path = require('path');
const AVATAR_PATH=path.join('/uploads/users/avatars');
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    dob:{
        type:Date,
        required:true
    },
    gender:{
        type:String,
        required:true
    },
    avatar: {
        type: String
     },
     photos:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Photo'
     }],
    friendships: [
        { 
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Friendship' 
        }
    ]

}, {
    timestamps: true
});

  let storage2 = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null,path.join(__dirname,'..',AVATAR_PATH));
    },
    filename: function (req, file, cb) {
      cb(null, file.fieldname + '-' + Date.now());
    }
  });


//static methods
userSchema.statics.uploadedPhoto2 = multer({storage:  storage2}).single('avatar');
userSchema.statics.AvatarPath=AVATAR_PATH;
const User = mongoose.model('User', userSchema);
module.exports = User;