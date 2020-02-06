const express=require('express');
const router=express.Router();
const Author=require('../models/author.model');

//GET: All authors
router.get('/', (req,res)=>{
    Author.find().then(authors => {
        res.status(200).json(authors);    
    }).catch(err => {
        res.status(500).json({
            message: err.message
        });
    });
});

//GET: a particular author
router.get('/:id', (req,res)=>{
    Author.findById(req.params.id)
    .then(author => {
        if (!author)
            res.status(404).send('Author was not found');
        else
            res.status(200).json(author);
    });
});

//POST: a new author
router.post('/', (req,res)=>{
    const newAuthor=new Author({
        firstName: req.body.firstName,
        lastName: req.body.lastName
    });
    newAuthor.save()
    .then(author=> res.json(author))
    .catch(err => res.json({error: err.message}));
});

//PUT: updating an author
router.put('/:id', (req,res)=>{
    Author.findByIdAndUpdate(req.params.id, req.body)
    .catch(err=> res.status(404).json({error: err.message}));
    res.status(200).json({msg:'Author was successfully updated!'});
});

//DELETE: deleting an author
router.delete('/:id', (req,res)=>{
    Author.findByIdAndDelete(req.params.id)
    .catch(err=> res.status(404).json({error:err.message}));
    res.status(200).json({message: 'Author is successfully deleted from db'});
});

module.exports=router;