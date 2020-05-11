//include express and create a router
const express = require('express');
const router = express.Router();

const homeController = require('../controllers/home_controller');
router.get('/', homeController.homepage);
//redirect all users related routed to users.js
router.use('/users', require('./users'));
//redirect all friends related routed to friends.js
router.use('/friends',require('./friends'));
//redirect all posts related routed to posts.js
router.use('/posts', require('./posts'));
//redirect all photos related routed to photos.js
router.use('/photos',require('./photos'));
//redirect all comments related routed to comments.js
router.use('/comments',require('./comments'));
//redirect all likes related routed to likes.js
router.use('/likes', require('./likes'));
//export router
module.exports = router;





