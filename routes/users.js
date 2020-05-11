//require express and passport and create router 
const express = require('express');
const router = express.Router();
const passport = require('passport');

const usersController = require('../controllers/users_controllers');

router.post('/create',usersController.create);                              //route for adding a user
router.get('/profile/:id', passport.checkAuthentication, usersController.profile);              //route for viewing profile of a user
router.post('/update/:id', passport.checkAuthentication, usersController.update);               //route for updating profile of logged in user
router.get('/home', usersController.home);                                  //route for homepage after logging in

//use passport as a middleware to authenticate
router.post('/create-session', passport.authenticate(                       //route for creating a session when a user logs in 
    'local',
    {failureRedirect: '/users/sign_in'},
), usersController.createSession);

router.get('/sign_up', usersController.signUp);                                     //route for sign up
router.get('/sign-in',passport.checkAuthentication,usersController.signIn);         //route for sign in
router.get('/sign-out', usersController.destroySession);                            //route for sign out

module.exports = router;                                //export router