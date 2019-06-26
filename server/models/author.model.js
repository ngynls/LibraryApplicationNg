const mongoose=require('mongoose');

const authorSchema=new mongoose.Schema({
    firstName:{
        type:String,
        required: 'First name cannot be empty',
    },
    lastName:{
        type:String,
        required: 'Last name cannot be empty',
    },
});

module.exports=Author=mongoose.model('Author', authorSchema);