const mongoose=require('mongoose');

const genreSchema=new mongoose.Schema({
    genreName:{
        type:String,
        required: 'Genre name cannot be empty',
    }
});

module.exports=Genre=mongoose.model('Genre', genreSchema);