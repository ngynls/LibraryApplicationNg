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
    publisher:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Publisher'
    },
    genres:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Genre'
    }]
});

module.exports=Book=mongoose.model('Book', bookSchema);