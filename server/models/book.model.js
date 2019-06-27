const mongoose=require('mongoose');

const bookSchema=new mongoose.Schema({
    title:{
        type:String,
        required: 'Title cannot be empty',
    },
    isbn:{
        type:String,
        required: 'Isbn cannot be empty'
    },
    authors:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Author'
    }],
    publishedYear:{
        type:Number
    },
    nbOfPages:{
        type:Number
    },
    language:{
        type:String
    },
    edition:{
        type:String
    },
    summary:{
        type:String
    },
    cover:{
        type:String
    },
    locationInLibrary:{
        type:String,
        required: 'Location cannot be empty'
    },
    publisher:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Publisher'
    },
    genre:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Genre'
    },
    copies:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'BookCopy'
    }]
});

module.exports=Book=mongoose.model('Book', bookSchema);