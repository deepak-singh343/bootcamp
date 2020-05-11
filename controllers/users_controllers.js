const User=require('../models/user');
const Friendship=require('../models/friendship');
const Post=require('../models/post');
const Photo=require('../models/photos');
const path=require('path');
const fs=require('fs');
const FriendRequest=require('../models/friendrequest');
module.exports.create = function(req, res)                                  //creating a user
{
    if (req.body.password != req.body.confirm_password){                    //if password do not match redirect back
        req.flash('error', 'Passwords do not match');
        return res.redirect('back');
    }
    User.findOne({email: req.body.email}, function(err, user){          //find user by email
        if(err)
        {
            req.flash('error', err); 
            return res.redirect('back');
        }

        if (!user)                                                   //if user doesnt exist create the user
        {
            User.create(req.body, function(err, user)
            {
                 if(err)
                 {
                    req.flash('error', err);
                    return res.redirect('back');
                }
                req.flash('success', 'Account created, Please login to continue!');
                return res.redirect('back');  
            })
        }else{                                                      //else redirect him back
            req.flash('success', 'You already have an account, Please login to continue!');
            return res.redirect('back');
        }

    });
}

module.exports.signUp = function(req, res){                         //if someone hit url localhost/8000/users/sign_up
    if (req.isAuthenticated()){
        return res.redirect('/users/home');                     //if he is logged in user then redirect him to homepage
    }
    return res.render('sign_up', {
        title: "Codeial | Sign Up"                              //else if he is not logged in user then redirect him to signup page
    })
}

module.exports.signIn = function(req, res){                           //if someone hit url localhost/8000/users/sign_inp

    if (req.isAuthenticated()){
        return res.redirect('/users/home');                     //if he is logged in user then redirect him to homepage
    }
    return res.render('sign_up', {
        title: "Codeial | Sign In",                             //else if he is not logged in user then redirect him to signup page
    })
}
module.exports.createSession = function(req, res){                  //create session
    req.flash('success', 'Logged in Successfully');
    return res.redirect('/users/home');                             
}

module.exports.destroySession = function(req, res){                     //logout
    req.logout();
    req.flash('success', 'Logged out!');
    return res.redirect('/');
}

module.exports.home = async function(req, res){                             //homepage
    try{
        let users = await User.find({});                            //find all the users

        let photos=await Photo.find({})                             //find all the photos
        .sort('-createdAt')
        .populate('user')
        .populate({path:'comments',
        populate:{path:'user'}
        })
        .populate({path:'likes',
        populate:{path:'user'}});

        let friends=await Friendship.find({})                      //find all the friends
        .sort('-createdAt')
        .populate('from_user')
        .populate('to_user');

        let posts = await Post.find({})                             //find all the posts
        .sort('-createdAt')
        .populate('user')
        .populate({path:'comments',
            populate:{path:'user'}
        })
        .populate({path:'likes',
        populate:{path:'user'}});

        let friendrequests=await FriendRequest.find({})                 //find all friendrequest
        .sort('-createdAt').
        populate('from_user').
        populate('to_user');

        return res.render('home', {
            title: "Homepage",                    // render all posts,friends,photos,friendrequest and users to homepage
            all_users: users,
            all_friends:friends,
            all_posts:posts,
            all_photos:photos,
            all_requests:friendrequests
        });

    }catch(err){
        req.flash('error', err);
        return;
    } 
}

module.exports.profile = async function(req, res){                          //profile page
    let user=await User.findById(req.params.id);                //find user by the id

    let photos=await Photo.find({user:req.params.id})             //find all the photos of the user
    .sort('-createdAt')
        .populate('user')
        .populate({path:'comments',
            populate:{path:'user'}
        });
    let posts=await Post.find({user:req.params.id})             //find all the posts of the user
    .sort('-createdAt')
        .populate('user')
        .populate({path:'comments',
            populate:{path:'user'}
        });
        return res.render('user_profile', {
            title: 'User Profile',
            profile_user: user,                               //render the user,his posts and his photos to profilepage
            all_posts:posts,
            all_photos:photos
        });
}

module.exports.update=async function(req,res)                   //update profile
{
    if(req.user.id==req.params.id)
    {
        try{
            let user=await User.findById(req.params.id);                //find the user
            User.uploadedPhoto2(req,res,function(err)
            {
                if(err)
                    console.log('Multer error',err);
                user.name=req.body.name;
                user.email=req.body.email;
                user.dob=req.body.dob;
                user.gender=req.body.gender;
                if(req.file)
                {
                    if (user.avatar){
                         fs.unlinkSync(path.join(__dirname, '..', user.avatar));            //delete existing profile pic of the user
                     }
                    user.avatar=User.AvatarPath+'/'+req.file.filename;                  //store the new pic in uploads/avatars
                    req.flash('success','Profile Updated');
                }
                user.save();
                return res.redirect('back');
            })
        }
        catch(err)
        {
            req.flash('error', err);
            return res.redirect('back');
        }
    }
    else{
        req.flash('error', 'Unauthorized');
    }
}


