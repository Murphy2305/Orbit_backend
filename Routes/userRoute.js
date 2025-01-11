const express = require('express');
const { addUser, getUser } = require('../Controllers/userController');
const router = express.Router();



router.route('/adduser').post(addUser); 
router.route('/:userId').get(getUser); 



module.exports = router;