const mongoose=require('mongoose');

const memberSchema=new mongoose.Schema({
    firstName:{
        type:String,
        required: 'First name cannot be empty',
    },
    lastName:{
        type:String,
        required: 'Last name cannot be empty',
    },
    dob:{
        type:Date,  
    },
    address:String,
    postalCode:String,
    telephone:String,
    email:String
});
//TODO: Add loans & reservation fields later...

memberSchema.path('telephone').validation(function(phone){
    const phoneRegex=/^(\+\d{1,2}\s)?\(?\d{3}\)?[\s.-]\d{3}[\s.-]\d{4}$/;
    return phoneRegex.test(phone.text);
}, `Your phone input doesn't have a valid format`);

memberSchema.path('email').validate(function (email) {
    const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return emailRegex.test(email.text); 
 }, `Your email input doesn't have a valid format`);

module.exports=Member=mongoose.model('Member', memberSchema);