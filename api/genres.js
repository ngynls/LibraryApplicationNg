const express=require('express');
const router=express.Router();
const Genre=require('../models/genre.model');

// GET : All genres
router.get('/', (req,res)=>{
    Genre.find().then(genres=>{
        res.status(200).json(genres);
    }).catch(err=>{
        res.status(500).json({message: err.message});
    });
});

// GET: A particular genre
router.get('/:id', (req,res)=>{
    Genre.findById(req.params.id)
    .then(genre => {
        if (!genre)
            res.status(404).send('Genre was not found');
        else
            res.status(200).json(genre);
    });
});

// POST: A new genre
router.post('/', (req,res)=>{
    const newGenre=new Genre({
        genreName: req.body.genreName,
    });
    newGenre.save()
    .then(genre=> res.json(genre))
    .catch(err => res.json({error: err.message}));
});

// PUT: Update a genre
router.put('/:id', (req,res)=>{
    Genre.findByIdAndUpdate(req.params.id, req.body)
    .catch(err=> res.status(404).json({error: err.message}));
    res.send('Genre was successfully updated!');
});

// DELETE: A particular genre
router.delete('/:id', (req,res)=>{
    Genre.findByIdAndDelete(req.params.id)
    .catch(err=> res.status(404).json({error:err.message}));
    res.status(200).json({message: 'Genre is successfully deleted from db'});
});

module.exports=router;