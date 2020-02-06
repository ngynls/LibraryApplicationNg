const express=require('express');
const router=express.Router();
const Publisher=require('../models/publisher.model');

// GET : All publishers
router.get('/', (req,res)=>{
    Publisher.find().then(publishers=>{
        res.status(200).json(publishers);
    }).catch(err=>{
        res.status(500).json({message: err.message});
    });
});

// GET: A particular publisher
router.get('/:id', (req,res)=>{
    Publisher.findById(req.params.id)
    .then(publisher => {
        if (!publisher)
            res.status(404).send('Publisher was not found');
        else
            res.status(200).json(publisher);
    });
});

// POST: A new publisher
router.post('/', (req,res)=>{
    const newPublisher=new Publisher({
        publisherName: req.body.publisherName,
        location: req.body.location
    });
    newPublisher.save()
    .then(publisher=> res.json(publisher))
    .catch(err => res.json({error: err.message}));
});

// PUT: Update a publisher
router.put('/:id', (req,res)=>{
    Publisher.findByIdAndUpdate(req.params.id, req.body)
    .catch(err=> res.status(404).json({error: err.message}));
    res.status(200).json({msg: 'Publisher was successfully updated!'});
});

// DELETE: A particular publisher
router.delete('/:id', (req,res)=>{
    Publisher.findByIdAndDelete(req.params.id)
    .catch(err=> res.status(404).json({error:err.message}));
    res.status(200).json({message: 'Publisher is successfully deleted from db'});
});

module.exports=router;