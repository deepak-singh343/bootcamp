const User = require('../models/user');
const Photo = require('../models/photos');

module.exports.create = async function (req, res)                                  //creating a user
{
        try{
                if (req.body.password != req.body.confirm_password)             //if password do not match redirect back
                {                    
                    req.flash('error', 'Passwords do not match');
                    return res.redirect('back');
                }
                let user=await User.findOne({ email: req.body.email });          //find user by email
                if (!user)                                                   //if user doesnt exist create the user
                {
                    let newUser=await User.create(req.body);
                    req.flash('success', 'Account created, Please login to continue!');
                    return res.redirect('back');
                } 
                else 
                {                                                      //if user already has an account redirect him back
                    req.flash('success', 'You already have an account, Please login to continue!');
                    return res.redirect('back');
                }
        }
        catch (err) 
        {
                req.flash('error', err);
                return;
        }
        
}

module.exports.signUp = function (req, res)              //if someone hit url localhost/8000/users/sign_up
{                         
    if (req.isAuthenticated()) 
    {
        return res.redirect('/users/home');                     //if user is logged in then redirect him to homepage
    }
    return res.render('sign_up', {
        title: "Codeial | Sign Up"                              //else if user is not logged in then redirect him to signup page
    })
}

module.exports.signIn = function (req, res)                 //if someone hit url localhost/8000/users/sign_inp
{                           

    if (req.isAuthenticated()) 
    {
        return res.redirect('/users/home');                     //if user is logged in then redirect him to homepage
    }
    return res.render('sign_up', {
        title: "Codeial | Sign In",                             //else if user is not logged in then redirect him to signup page
    })
}
module.exports.createSession = function (req, res)              //create session
{                  
    req.flash('success', 'Logged in Successfully');
    return res.redirect('/users/home');
}

module.exports.destroySession = function (req, res)              //logout
{                    
    req.logout();
    req.flash('success', 'Logged out!');
    return res.redirect('/');
}

module.exports.home = async function (req, res)                  //homepage
{                            
    try {
        let users = await User.find({});                              //find all the users
        let photos = await Photo.find({}).sort('-createdAt').populate('user')      //find all the photos
        return res.render('home', {
            title: "Homepage",
            users,
            photos
        });

    } 
    catch (err) 
    {
        req.flash('error', err);
        return;
    }
}


