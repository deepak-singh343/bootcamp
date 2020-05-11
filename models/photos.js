//require mongoose and create schema for photos
const mongoose = require('mongoose');
const path = require('path');
const PHOTOS_PATH = path.join('/uploads/users/photos');
const multer = require('multer');
const photoSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    name:{
        type:String
    },
    comments: [
        {
            type:  mongoose.Schema.Types.ObjectId,
            ref: 'Comment'
        }
    ],
    likes: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Like'
        }
    ]
},{
    timestamps: true
});

let storage1 = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, path.join(__dirname, '..', PHOTOS_PATH));
    },
    filename: function (req, file, cb) {
      cb(null, file.fieldname + '-' + Date.now());
    }
  });
photoSchema.statics.uploadedPhoto1 = multer({storage:  storage1}).single('photos');
photoSchema.statics.PhotoPath = PHOTOS_PATH;
const Photo = mongoose.model('Photos', photoSchema);
module.exports = Photo;
