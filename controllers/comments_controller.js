const Comment = require('../models/comment');
const Post = require('../models/post');
const Like = require('../models/like');
const Photo=require('../models/photos');
module.exports.create = async function(req, res){               //create a comment
    try{
            let post = await Post.findById(req.body.post);              //find post 
            let photo=await Photo.findById(req.body.photo);             //find photo
            if (post){                  
                let comment = await Comment.create({
                    content: req.body.content,                      //if post exists create a comment for post
                    post: req.body.post,
                    user: req.user._id
                });

                post.comments.push(comment);                        //push the comment to the post 
                post.save();
                return res.redirect('back');
            }
            if(photo){                                                  //if photo exists create a comment for photo
                let comment = await Comment.create({
                    content: req.body.content,
                    photo: req.body.photo,
                    user: req.user._id
                });

                photo.comments.push(comment);                       //push the comment to the photo
                photo.save();
                return res.redirect('back');
            }
    }catch(err){
        req.flash('error', err);
        return;
    }
    
}


module.exports.destroy = async function(req, res){                                  //delete a comment

    try{
            let comment = await Comment.findById(req.params.id);                    //find the comment
            let postId = comment.post;                                               //find post 
            let photoId=comment.photo;                                                //find photo
            
            let post = await Post.findByIdAndUpdate(postId,{ $pull:{comments:comment._id}});            //remove comment from post
            let photo = await Photo.findByIdAndUpdate(photoId,{ $pull:{comments:comment._id}});            //remove comment from photo
            await Like.deleteMany({likeable: comment._id, onModel: 'Comment'});                             //delete likes associated with the comment

            req.flash('success', 'Comment deleted!');
            comment.remove();
            return res.redirect('back');
    }catch(err){
        req.flash('error', err);
        return console.log(err);
    }
}