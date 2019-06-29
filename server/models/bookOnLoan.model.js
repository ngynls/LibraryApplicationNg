const mongoose=require('mongoose');

const bookOnLoanSchema=new mongoose.Schema({
    copyId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'BookCopy'
    },
    memberId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Member'
    },
    dateIssued: Date,
    dueDate: Date,
    returnFine: Number
});

module.exports=BookOnLoan=mongoose.model('BookOnLoan', bookOnLoanSchema);