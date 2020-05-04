const express = require('express');
const router = express.Router();
const {getOrderById, getOrder, createOrder, getAllOrders, getOrderStatus, updateOrderStatus} = require('../controllers/order');
const {isSignedIn,isAuthorized,isAdmin} = require('../controllers/auth');
const {getUserById, pushOrderInPurchaseList, userPurchaseList} = require('../controllers/user');
const {updateStock} = require('../controllers/product')

//params

router.param('orderId', getOrderById);
router.param('userId',getUserById);


//get routes

router.get('/order/:orderId', getOrder);

router.get('/order/all/:userId', isSignedIn, isAuthorized, isAdmin, getAllOrders);

router.get('/order/status/:userId', isSignedIn, isAuthorized,isAdmin, getOrderStatus);


//post routes

router.post('/order/create/:userId', isSignedIn, isAuthorized, pushOrderInPurchaseList, updateStock, createOrder );

//put routes

router.put('/order/:orderId/status/:userId', isSignedIn, isAuthorized, isAdmin, updateOrderStatus);

module.exports = router;