const mongoose=require('mongoose');

const publisherSchema=new mongoose.Schema({
    publisherName:{
        type:String,
        required: 'Publisher name cannot be empty',
    },
    location:{
        type:String,
        required: 'Location cannot be empty',
    },
});

module.exports=Publisher=mongoose.model('Publisher', publisherSchema);