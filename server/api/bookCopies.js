const express=require('express');
const router=express.Router();
const BookCopy=require('../models/bookCopy.model');
const Book=require('../models/book.model');

//GET: All books copies
router.get('/', (req,res)=>{
    BookCopy.find().populate('bookId').then(copies => {
        res.status(200).json(copies);    
    }).catch(err => {
        res.status(500).json({
            message: err.message
        });
    });
});

//GET: a particular book copy
router.get('/:id', (req,res)=>{
    BookCopy.findById(req.params.id)
    .populate('bookId')
    .then(copy => {
        if (!copy)
            res.status(404).send('Book copy was not found');
        else
            res.status(200).json(copy);
    });
});

//POST: a new book copy
router.post('/', (req,res)=>{
    const newCopy=new BookCopy({
        copyName: req.body.copyName,
        bookId: req.body.bookId,
        status: req.body.status
    });
    newCopy.save()
    .then(copy=> res.json(copy))
    .catch(err => res.json({error: err.message}));
    //TODO: push it to the copy array for the corresponding book
});

//PUT: updating a book copy
router.put('/:id', (req,res)=>{
    BookCopy.findByIdAndUpdate(req.params.id, req.body)
    .catch(err=> res.status(404).json({error: err.message}));
    res.send('Book copy was successfully updated!');
});

//DELETE: deleting a book copy
router.delete('/:id', (req,res)=>{
    BookCopy.findByIdAndDelete(req.params.id)
    .catch(err=> res.status(404).json({error:err.message}));
    res.status(200).json({message: 'Book copy is successfully deleted from db'});
    //TODO: pull it from the copy array for the corresponding book
});

module.exports=router;