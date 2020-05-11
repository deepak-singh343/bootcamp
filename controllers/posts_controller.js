const Post = require('../models/post');
const Comment = require('../models/comment');
const Like = require('../models/like');
const User=require('../models/user');

module.exports.create = async function(req, res){                           //create a post
    try{
        let post = await Post.create({
            content: req.body.content,                                  //add a post
            user: req.user._id
        });
        req.flash('success', 'Post published!');
        return res.redirect('back');
    }catch(err){
        req.flash('error', err);
        return res.redirect('back');
    } 
}


module.exports.destroy = async function(req, res){                          //delete a post

    try{
            let post = await Post.findById(req.params.id);                  //find post
            let user=await User.findOne({_id:req.user});                    //find user
            
            await Like.deleteMany({likeable:post,onModel:'Post'});
            await Like.deleteMany({_id:{$in:post.comments}});                   //delete likes associated with post 

            await Comment.deleteMany({post:req.params.id});                     //delete comments associated with post
            post.remove();                                              //delete post
            req.flash('success', 'Post deleted!');

            return res.redirect('back');

    }catch(err){
        req.flash('error', err);
        return res.redirect('back');
    }
    
}