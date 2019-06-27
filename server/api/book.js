const express=require('express');
const router=express.Router();
const Book=require('../models/book.model');

//GET: All books
router.get('/', (req,res)=>{
    Book.find().then(books => {
        res.status(200).json(books);    
    }).catch(err => {
        res.status(500).json({
            message: err.message
        });
    });
});

//GET: a particular book
router.get('/:id', (req,res)=>{
    Book.findById(req.params.id)
    .populate('authors')
    .populate('genre')
    .then(book => {
        if (!book)
            res.status(404).send('Book was not found');
        else
            res.status(200).json(book);
    });
});

//POST: a new book
router.post('/', (req,res)=>{
    const newBook=new Book({
        title: req.body.title,
        isbn: req.body.isbn,
        authors: req.body.authors,
        publishedYear: req.body.publishedYear,
        nbOfPages: req.body.nbOfPages,
        language: req.body.language,
        edition: req.body.edition,
        summary: req.body.summary,
        cover: req.body.cover,
        locationInLibrary: req.body.locationInLibrary,
        publisher: req.body.publisher,
        genre: req.body.genre,
        copies: req.body.copies
    });
    newBook.save()
    .then(book=> res.json(book))
    .catch(err => res.json({error: err.message}));
});

//PUT: updating a book
router.put('/:id', (req,res)=>{
    Book.findByIdAndUpdate(req.params.id, req.body)
    .catch(err=> res.status(404).json({error: err.message}));
    res.send('Book was successfully updated!');
});

//DELETE: deleting a book
router.delete('/:id', (req,res)=>{
    Book.findByIdAndDelete(req.params.id)
    .catch(err=> res.status(404).json({error:err.message}));
    res.status(200).json({message: 'Book is successfully deleted from db'});
});

module.exports=router;