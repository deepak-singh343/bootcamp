//include express and create a router
const express = require('express');
const router = express.Router();
const likesController = require('../controllers/likes_controller');
router.get('/toggle', likesController.toggleLike);   //route for toggling like 
module.exports = router;        //export router