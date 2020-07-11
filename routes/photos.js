//require express and passport and create router 
const express = require('express');
const router = express.Router();
const passport = require('passport');

const photosController = require('../controllers/photos_controller');
router.post('/addphotos/:id', passport.checkAuthentication, photosController.addphotos);     //route for adding a photo
router.get('/destroy/:id', passport.checkAuthentication, photosController.destroy);     //route for deleting a photo
router.post('/rate/:id', passport.checkAuthentication, photosController.rate);     //route for rating a photo

module.exports = router;                //export router