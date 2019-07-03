const express=require('express');
const router=express.Router();
const BookOnLoan=require('../models/bookOnLoan.model');

// GET : All loaned books
router.get('/', (req,res)=>{
    BookOnLoan.find().then(loanedBooks=>{
        res.status(200).json(loanedBooks);
    }).catch(err=>{
        res.status(500).json({message: err.message});
    });
});

// GET: A particular loaned book
router.get('/:id', (req,res)=>{
    BookOnLoan.findById(req.params.id)
    .then(loanedBook => {
        if (!loanedBook)
            res.status(404).send('Loaned book was not found');
        else
            res.status(200).json(loanedBook);
    });
});

// POST: A new loaned book
router.post('/', (req,res)=>{
    const currentDate=new Date(Date.now());
    const bookDue=new Date(Date.now()+12096e5);
    const newLoanedBook=new BookOnLoan({
        copyId: req.body.copyId,
        memberId: req.body.memberId,
        dateIssued: currentDate,
        dueDate: bookDue,
        returnFine: 0
    });
    newLoanedBook.save()
    .then(loanedBook=> res.json(loanedBook))
    .catch(err => res.json({error: err.message}));
    //TODO: add to member's loans array
    User.findByIdAndUpdate(req.body.memberId, {
        $push:{
            loans: newLoanedBook._id
        }
    }).catch(err=> console.log(err.message));
});

// PUT: Update a loaned book
router.put('/:id', (req,res)=>{
    BookOnLoan.findByIdAndUpdate(req.params.id, req.body)
    .catch(err=> res.status(404).json({error: err.message}));
    res.send('Loaned book was successfully updated!');
});

// DELETE: A particular loaned book
router.delete('/:id', (req,res)=>{
    BookOnLoan.findByIdAndDelete(req.params.id)
    .catch(err=> res.status(404).json({error:err.message}));
    res.status(200).json({message: 'Loaned book is successfully deleted from db'});
    // TODO: remove from the book from member's loans array
    User.findByIdAndUpdate(req.body.memberId, {
        $pull:{
            loans: req.params.id
        }
    }).catch(err=> console.log(err.message));
});

module.exports=router;