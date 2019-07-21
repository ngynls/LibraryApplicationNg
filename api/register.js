const express=require('express');
const router=express.Router();

const User=require('../models/user.model');

router.post('/', (req,res,next)=>{
    const userToRegister=new User({
        username: req.body.username,
        password: req.body.password,
    });
    userToRegister.save((err,user)=>{
        if(!err){
            console.log(`User was saved`);
            res.status(200).json(user);
        }
        else{
            if(err.code == 11000)
                res.status(422).send(['Duplicate email address found']);
            else
                return next(err);
        }
    });
});

module.exports=router;