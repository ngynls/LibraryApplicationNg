const express=require('express');
const router=express.Router();
const BookOnLoan=require('../models/bookOnLoan.model');
const Member=require('../models/libraryMember.model');
const BookCopy=require('../models/bookCopy.model');

// GET : All loaned books
router.get('/', (req,res)=>{
    BookOnLoan.find()
    .populate('copyId', 'copyName')
    .populate('memberId', 'firstName lastName')
    .then(loanedBooks=>{
        res.status(200).json(loanedBooks);
    }).catch(err=>{
        res.status(500).json({message: err.message});
    });
});

// GET: A particular loaned book
router.get('/:id', (req,res)=>{
    BookOnLoan.findById(req.params.id)
    .populate('copyId', 'copyName')
    .then(loanedBook => {
        if (!loanedBook)
            res.status(404).send('Loaned book was not found');
        else
            res.status(200).json(loanedBook);
    });
});

// GET: All loaned books of a particular user
router.get('/findByUser/:id',(req,res)=>{
    BookOnLoan.find({memberId:req.params.id})
    .populate('copyId', 'copyName')
    .then(loanedBooks=>{
        if(!loanedBooks)
            res.status(404).send('Could not retrieve loaned books for this user');
        else
            res.status(200).json(loanedBooks);
    });
});

// POST: A new loaned book
router.post('/', async(req,res)=>{
    const currentDate=new Date(Date.now());
    const bookDue=new Date(Date.now()+12096e5);
    const newLoanedBook=new BookOnLoan({
        copyId: req.body.copyId,
        memberId: req.body.memberId,
        dateIssued: currentDate,
        dueDate: bookDue
    });
    newLoanedBook.save()
    .then(loanedBook=> res.json(loanedBook))
    .catch(err => res.json({error: err.message}));
    //add to member's loans array & update bookcopy with the status on loan
    await Member.findOneAndUpdate({_id:req.body.memberId}, {
        $push:{
            loans: newLoanedBook._id
        }
    }).catch(err=> console.log(err.message));
    await BookCopy.findOneAndUpdate({_id:req.body.copyId}, {$set:{status: 'On loan'}})
        .catch(err=> console.log(err.message));
});

// PUT: Update a loaned book
router.put('/:id', async(req,res)=>{
    await BookOnLoan.findOneAndUpdate({_id:req.params.id}, req.body)
    .catch(err=> res.status(404).json({error: err.message}));
    res.status(200).json({msg:'Loaned book was successfully updated!'});
});

// DELETE: A particular loaned book
router.delete('/:id', async(req,res)=>{
    const loanedBookToDelete=await BookOnLoan.findOne({_id:req.params.id})
    .catch(err=>res.status(404).json({error:err.message}));
    await BookOnLoan.findOneAndRemove({_id:req.params.id})
    .catch(err=> res.status(404).json({error:err.message}));
    res.status(200).json({message: 'Loaned book is successfully deleted from db'});
    //remove from the book from member's loans array & change status of copy to available
    await Member.findOneAndUpdate({_id:loanedBookToDelete.memberId}, {
        $pull:{
            loans: req.params.id
        }
    }).catch(err=> console.log(err.message));
    await BookCopy.findOneAndUpdate({_id:loanedBookToDelete.copyId}, {$set:{status: 'Available'}}).catch(err=> console.log(err.message));
});

module.exports=router;