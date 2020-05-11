//require express and passport and create router 
const express = require('express');
const router = express.Router();
const passport = require('passport');

const friendsController = require('../controllers/friends_controller');
router.post('/sendRequest/:id', passport.checkAuthentication, friendsController.sendRequest);       //route for sending a frind request
router.post('/removeRequest/:id', passport.checkAuthentication, friendsController.removeRequest);      //route for rejecting a friend request
router.post('/addfriend/:id', passport.checkAuthentication, friendsController.addFriend);           //route for adding a friend to friend list
router.post('/removefriend/:id', passport.checkAuthentication,friendsController.removeFriend);      //route for removing a friend from friendlist   
module.exports = router;      //export router