const express=require('express');
const router=express.Router();
const Reservation=require('../models/reservation.model');

// GET : All reservations
router.get('/', (req,res)=>{
    Reservation.find().then(reservations=>{
        res.status(200).json(reservations);
    }).catch(err=>{
        res.status(500).json({message: err.message});
    });
});

// GET: A particular reservation
router.get('/:id', (req,res)=>{
    Reservation.findById(req.params.id)
    .then(reservation => {
        if (!reservation)
            res.status(404).send('Reservation was not found');
        else
            res.status(200).json(reservation);
    });
});

// POST: A new reservation
router.post('/', (req,res)=>{
    const currentDate=new Date(Date.now());
    const newReservation=new Reservation({
        memberId: req.body.memberId,
        copyId: req.body.copyId,
        dateRequested: currentDate
    });
    newReservation.save()
    .then(reservation=> res.json(reservation))
    .catch(err => res.json({error: err.message}));
    //TODO: add to member's reservations array
});

// PUT: Update a reservation
router.put('/:id', (req,res)=>{
    Reservation.findByIdAndUpdate(req.params.id, req.body)
    .catch(err=> res.status(404).json({error: err.message}));
    res.send('Reservation was successfully updated!');
});

// DELETE: A particular reservation
router.delete('/:id', (req,res)=>{
    Reservation.findByIdAndDelete(req.params.id)
    .catch(err=> res.status(404).json({error:err.message}));
    res.status(200).json({message: 'Reservation is successfully deleted from db'});
    // TODO: remove from the book from member's reservations array
});

module.exports=router;