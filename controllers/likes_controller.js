const Like = require("../models/like");
const Post =  require("../models/post");
const Comment = require('../models/comment');
const Photo=require('../models/photos');

module.exports.toggleLike = async function(req, res){                               //add or delete a like
    try{
            let likeable;
            let deleted = false;

            if (req.query.type == 'Post'){
                likeable = await Post.findById(req.query.id).populate('likes');         //find post 
            }else if (req.query.type == 'Comment'){
                likeable = await Comment.findById(req.query.id).populate('likes');      //find comment
            }else {
                likeable = await Photo.findById(req.query.id).populate('likes');        //find photo
            }
            

            let existingLike = await Like.findOne({
                likeable: req.query.id,
                onModel: req.query.type,
                user: req.user._id
            })

            // if a like already exists then delete it
            if (existingLike){
                likeable.likes.pull(existingLike._id);
                likeable.save();

                existingLike.remove();
                deleted = true;

            }else{
                // else make a new like
                let newLike = await Like.create({
                    user: req.user._id,
                    likeable: req.query.id,
                    onModel: req.query.type
                });

                likeable.likes.push(newLike._id);
                likeable.save();

            }

            return res.redirect('back');
    }catch(err){
        req.flash('error', err);
    }
}