const mongoose=require('mongoose');

const reservationSchema=new mongoose.Schema({
    memberId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Member'
    },
    copyId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'BookCopy'
    },
    dateRequested: Date
});

module.exports=Reservation=mongoose.model('Reservation', reservationSchema);