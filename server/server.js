const express=require('express');
const mongoose=require('mongoose');
const cors=require('cors');
const passport=require('passport');

const app=express();
app.use(express.json());
app.use(cors());
app.use(passport.initialize());

const db=require('./config/keys').mongoURL;
const authors=require('./api/authors');
const publishers=require('./api/publishers');
const genres=require('./api/genres');
const books=require('./api/book');
const bookCopies=require('./api/bookCopies');


mongoose.connect(db, {useNewUrlParser: true, useFindAndModify: false})
  .then(()=> console.log('Connected!'))
  .catch(err => console.log(err));

app.use('/authors', authors);
app.use('/publishers', publishers);
app.use('/genres', genres);
app.use('/books', books);
app.use('/bookCopies', bookCopies);

const port= process.env.PORT || 5000;

app.listen(port, ()=> console.log(`Server started at port ${port}`));