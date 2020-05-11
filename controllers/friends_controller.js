const User=require('../models/user');
const Friendship=require('../models/friendship');
const FriendRequest=require('../models/friendrequest');
module.exports.addFriend=async function(req,res)                                //add a friend
{
    try{
        let user=await User.findOne({_id:req.user});                        //find the logged in user
        if(!user)
        {
            throw new Error('User not Found');
        }
        let friend=await User.findById(req.params.id);                       //find the user to whom friend request is sent
        const requester=await Friendship.create({
            from_user:friend,                                               //create a friend to whom friend request is sent
            to_user:user
        });
        const loggedin=await Friendship.create({                            //create a friend who has sent friend request
            from_user:user,                                                     
            to_user:friend
        });
        user.friendships.push(requester);
        user.save();
        friend.friendships.push(loggedin);
        friend.save();
        req.flash('success', 'Friend added to friendlist');
        let request=await FriendRequest.findOne({                   //after accepting friend request remove that request
            from_user:req.params.id,
            to_user:req.user
        });
        request.remove();
        return res.redirect('back');
    }
    catch(err)
    {
        req.flash('error', err);
        return res.redirect('back');
    }
}

module.exports.sendRequest=async function(req,res)
{
    try{
        let sender=await User.findOne({_id:req.user});                  //find user who has sent request
        if(!sender)
        {
            throw new Error('User not Found');
        }
        let accepter=await User.findById(req.params.id);                //find user to whom friend request is sent
        const requester=await FriendRequest.create({
            from_user:sender,                                             //create a request
            to_user:accepter
        });
        req.flash('success', 'Friend request sent');
        return res.redirect('back');
    }
    catch(err)
    {
        req.flash('error', err);
        return res.redirect('back');
    }
}

module.exports.removeRequest=async function(req,res)                        //remove the friend request
{
    try{
        let request=await FriendRequest.findOne({                   //find the request
            from_user:req.params.id,
            to_user:req.user
        });
        req.flash('success', 'Request rejected');
        request.remove();                                           //remove request
        return res.redirect('back');
    }
    catch(err)
    {
        req.flash('error', err);
        return res.redirect('back');
    }
}

module.exports.removeFriend=async function(req,res)                         //remove friend
{
    try{
        let user=await User.findOne({_id:req.user});                        //find logged in user
        if(!user)
        {
            throw new Error('User not Found');
        }
        let friend=await User.findById(req.params.id);                          //find the friend
        let requester=await Friendship.findOne({
            from_user:friend,                                                   
            to_user:user
        });
        let loggedinuser=await Friendship.findOne({
            from_user:user,
            to_user:friend
        });
        requester.remove();                                                 //remove first friend from friendlist
        loggedinuser.remove();                                              //remove second friend from friendlist
        let newuser1=await User.findByIdAndUpdate (user,{$pull:{friendships:requester._id}});
        let newuser2=await User.findByIdAndUpdate (friend,{$pull:{friendships:loggedinuser._id}});
        req.flash('success', 'Friend removed from friendlist');
        return res.redirect('back');
    }
    catch(err)
    {
        req.flash('error', err);
        return res.redirect('back');
    }
}