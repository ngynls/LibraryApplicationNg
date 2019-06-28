const mongoose=require('mongoose');

const bookCopySchema=new mongoose.Schema({
    copyName:{
        type:String,
        required:true
    },
    bookId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Book'
    },
    status:{
        type:String
    }
});

module.exports=BookCopy=mongoose.model('BookCopy', bookCopySchema);