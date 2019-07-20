const mongoose=require('mongoose');
const bcrypt=require('bcrypt');
const jwt=require('jsonwebtoken');
const jwt_secret=require('../config/keys').JWT_SECRET;

const userSchema=new mongoose.Schema({
    username:{
        type:String,
        required: 'Username cannot be empty',
        unique: true
    },
    password:{
        type:String,
        required: 'Password cannot be empty',
        minlength:[6, 'Password must be at least 6 characters long']
    },
    saltSecret: String
});

userSchema.pre('save', function(next){
    bcrypt.genSalt(10,(err,salt)=>{
        bcrypt.hash(this.password, salt, (err,hash)=>{
            this.password=hash;
            this.saltSecret=salt;
            next();
        });
    });
});

userSchema.methods.verifyPassword= function(password){
    return bcrypt.compareSync(password, this.password);
};

userSchema.methods.generateJwt= function(){
    return jwt.sign({_id: this._id}, jwt_secret, {expiresIn: "1h"});
}

module.exports=User=mongoose.model('User', userSchema);