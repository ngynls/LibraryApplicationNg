const express=require('express');
const passport=require('passport');
const router=express.Router();

router.post('/',(req,res,next)=>{
    passport.authenticate('local', (err, user, info)=>{
        if(err) return res.status(400).json(err);
        else if (user) return res.status(200).json({"token": user.generateJwt()});
        else return res.status(404).json(info);
    })(req,res);
});

module.exports=router;
