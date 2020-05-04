const express = require('express')
const {check,validationResult} = require('express-validator');
const router = express.Router();
const {signout,signup,signin, isSignedIn} = require('../controllers/auth')


router.post('/signup',[
    check('name','Name should be atleast 3 characters').isLength({min:3}),
    check('email', 'Invalid email').isEmail(),
    check('password','Password should atleast 6 characters long').isLength({min:6})
],signup);

router.post('/signin',[
    check('email', 'Invalid email').isEmail(),
    check('password','Password is required').isLength({min:1})
],signin);

router.get('/signout',signout);

router.get('/testroute',isSignedIn,(req,res)=>{
    res.json({
        status: 'success',
        desc:'testing route for checking protected route',
        auth: req.auth
    })
})

module.exports= router;