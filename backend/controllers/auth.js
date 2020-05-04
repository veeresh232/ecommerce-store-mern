const User = require('../models/user');
const {check,validationResult} = require('express-validator');
const jwt = require('jsonwebtoken');
const expressJwt = require('express-jwt');

exports.signup = (req,res) =>{

    const errors = validationResult(req);

    if(!errors.isEmpty()){
        return res.status(422).json({
            error: errors.array()[0].msg,
            params: errors.array()[0].param
        })
    }


    let user = new User(req.body);
    user.save((err,user)=>{
        if(err){
            return res.status(400).json({
                status: 'failed',
                err : 'Failed to register new user',
                description: err.errmsg,
                
            })
        }
        res.json({
            name: user.name,
            email: user.email,
            id: user._id
        });
    })
    
}

exports.signin = (req,res) =>{
    const errors = validationResult(req);
    const {email,password} = req.body;
    if(!errors.isEmpty()){
        return res.status(422).json({
            error: errors.array()[0].msg,
            params: errors.array()[0].param
        })
    }

    User.findOne({email},(err,user)=>{
        
        
        if(err || !user){
            return res.status(400).json({
                error: 'User email does not exist'
            })
        }

        if(!user.authenticate(password)){
            return res.status(401).json({
                error: 'Wrong password'
            })
        }

        //create token
        const token = jwt.sign({_id: user._id},process.env.SECRET);
        //putting token in cookie
        res.cookie("token", token,{expire: new Date()+9999});

        //sending response to front end
        const {_id,name, email,role} = user;

        res.json({token,user:{_id,name,email,role}});


    })
}

exports.signout = (req,res)=>{
    res.clearCookie('token');
    res.json({
        status: 'success',
        message: 'User signout'
    })
};


//protected 

exports.isSignedIn = expressJwt({
    secret: process.env.SECRET,
    userProperty : 'auth'
});

//custom middlewares

exports.isAuthorized = (req,res,next) =>{
    let isVerified = req.profile && req.auth && req.profile._id == req.auth._id;
    if(!isVerified){
        return res.status(403).json({
            error: 'Access Denied'
        })
    }
    next();
}

exports.isAdmin = (req,res,next) =>{
    if(req.profile.role === 0){
        return res.status(403).json({
            error: 'Insufficient Privilege'
        })
    }
    next();
}