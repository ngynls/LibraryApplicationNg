const express=require('express');
const router=express.Router();
const Reservation=require('../models/reservation.model');
const Member=require('../models/libraryMember.model');
const BookCopy=require('../models/bookCopy.model');

// GET : All reservations
router.get('/', (req,res)=>{
    Reservation.find()
    .populate('copyId', 'copyName')
    .populate('memberId', 'firstName lastName')
    .then(reservations=>{
        res.status(200).json(reservations);
    }).catch(err=>{
        res.status(500).json({message: err.message});
    });
});

// GET: A particular reservation
router.get('/:id', (req,res)=>{
    Reservation
    .findById(req.params.id)
    .populate('copyId', 'copyName')
    .then(reservation => {
        if (!reservation)
            res.status(404).send('Reservation was not found');
        else
            res.status(200).json(reservation);
    });
});

router.get('/findByUser/:id', (req,res)=>{
    Reservation.find({memberId: req.params.id})
        .populate('copyId', 'copyName')
        .then(reservations=>{
            if(!reservations)
                res.status(404).send('Reservation was not found for user');
            else
                res.status(200).json(reservations);
        });
});

// POST: A new reservation
router.post('/', async(req,res)=>{
    const currentDate=new Date(Date.now());
    const newReservation=new Reservation({
        memberId: req.body.memberId,
        copyId: req.body.copyId,
        dateRequested: currentDate
    });
    newReservation.save()
    .then(reservation=> res.json(reservation))
    .catch(err => res.json({error: err.message}));
    await Member.findOneAndUpdate({_id:req.body.memberId}, {
        $push:{
            reservations: newReservation._id
        }
    }).catch(err=> console.log(err.message));
    await BookCopy.findOneAndUpdate({_id:req.body.copyId}, {$set:{status: 'Reserved'}})
        .catch(err=> console.log(err.message));
});

// PUT: Update a reservation
router.put('/:id', async(req,res)=>{
    await Reservation.findOneAndUpdate({_id:req.params.id}, req.body)
    .catch(err=> res.status(404).json({error: err.message}));
    res.status(200).json({msg: 'Reservation was successfully updated!'});
});

// DELETE: A particular reservation
router.delete('/:id', async (req,res)=>{
    const reservationToDelete=await Reservation.findOne({_id:req.params.id})
    .catch(err=>res.status(404).json({error:err.message}));
    await Reservation.findOneAndRemove({_id:req.params.id})
    .catch(err=> res.status(404).json({error:err.message}));
    res.status(200).json({message: 'Reservation is successfully deleted from db'});
    await Member.findOneAndUpdate({_id:reservationToDelete.memberId}, {
        $pull:{
            reservations: req.params.id
        }
    }).catch(err=> console.log(err.message));
    await BookCopy.findOneAndUpdate({_id:reservationToDelete.copyId}, {$set:{status: 'Available'}}).catch(err=> console.log(err.message));
});

module.exports=router;