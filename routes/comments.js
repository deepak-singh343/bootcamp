//require express and passport and create router 
const express = require('express');
const router = express.Router();
const passport = require('passport');

const commentsController = require('../controllers/comments_controller');

router.post('/create', passport.checkAuthentication, commentsController.create);       //route for creating a comment
router.get('/destroy/:id', passport.checkAuthentication, commentsController.destroy);       //route for deleting a comment

module.exports = router;