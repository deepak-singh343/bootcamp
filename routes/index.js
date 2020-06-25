//include express and create a router
const express = require('express');
const router = express.Router();

const homeController = require('../controllers/home_controller');
router.get('/', homeController.homepage);
//redirect all users related routed to users.js
router.use('/users', require('./users'));
router.use('/photos', require('./photos'));
//export router
module.exports = router;





