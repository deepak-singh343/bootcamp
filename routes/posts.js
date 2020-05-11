//require express and passport and create router 
const express = require('express');
const router = express.Router();
const passport = require('passport');

const postsController = require('../controllers/posts_controller');

router.post('/create', passport.checkAuthentication, postsController.create);           //route for creating a post
router.get('/destroy/:id', passport.checkAuthentication, postsController.destroy);      //route for deleting a post

module.exports = router;            //export router