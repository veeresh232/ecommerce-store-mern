const express = require('express');
const router = express.Router();
const {getProductById , getProduct, createProduct, photo, updateProduct, deleteProduct, getAllProducts, getAllUniqueCategories} = require('../controllers/product');
const {isSignedIn,isAuthorized,isAdmin} = require('../controllers/auth');
const {getUserById} = require('../controllers/user');


//params
router.param('productId', getProductById);
router.param('userId',getUserById); 

// get routes
router.get('/product/:productId',getProduct);

router.get('/product/photo/:productId', photo);

router.get('/products', getAllProducts);

router.get('/products/categories', getAllUniqueCategories);

//create route

router.post('/product/create/:userId', isSignedIn, isAuthorized, isAdmin, createProduct);

//update routes
router.put('/product/:userId', isSignedIn, isAuthorized, isAdmin, updateProduct);


//delete routes
router.delete('/product/:productId/:userId', isSignedIn, isAuthorized, isAdmin, deleteProduct);







module.exports = router; 