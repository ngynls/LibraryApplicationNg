const express=require('express');
const router=express.Router();
const Member=require('../models/libraryMember.model');

// GET : All members
router.get('/', (req,res)=>{
    Member.find().then(members=>{
        res.status(200).json(members);
    }).catch(err=>{
        res.status(500).json({message: err.message});
    });
});

// GET: A particular member
router.get('/:id', (req,res)=>{
    Member.findById(req.params.id)
    .then(member => {
        if (!member)
            res.status(404).send('Member was not found');
        else
            res.status(200).json(member);
    });
});

// POST: A new member
router.post('/', (req,res)=>{
    const newMember=new Member({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        dob: req.body.dob,
        address: req.body.address,
        postalCode: req.body.postalCode,
        telephone: req.body.telephone,
        email: req.body.email,
        loans: [],
        reservations: []
    });
    newMember.save()
    .then(member=> res.json(member))
    .catch(err => res.json({error: err.message}));
});

// PUT: Update a member
router.put('/:id', (req,res)=>{
    Member.findByIdAndUpdate(req.params.id, req.body)
    .catch(err=> res.status(404).json({error: err.message}));
    res.status(200).json({msg:'Member was successfully updated!'});
});

// DELETE: A particular member
router.delete('/:id', (req,res)=>{
    Member.findByIdAndDelete(req.params.id)
    .catch(err=> res.status(404).json({error:err.message}));
    res.status(200).json({message: 'Member is successfully deleted from db'});
});

module.exports=router;