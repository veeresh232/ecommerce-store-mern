const express = require('express');
const router = express.Router();
const User = require('../models/user');
const {getUserById,getUser,updateUser,userPurchaseList} = require('../controllers/user')
const {isSignedIn,isAuthorized,isAdmin} = require('../controllers/auth')




router.param('userId',getUserById);



router.get('/user/:userId',isSignedIn,isAuthorized, getUser);

router.put('/user/:userId', isSignedIn,isAuthorized, updateUser);

router.get('/user/orders/:userId', isSignedIn,isAuthorized, userPurchaseList);

module.exports= router;