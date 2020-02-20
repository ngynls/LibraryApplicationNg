require('./config/passportConfig');
const express=require('express');
const path= require('path');
const mongoose=require('mongoose');
const cors=require('cors');
const passport=require('passport');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');

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
const members=require('./api/members');
const loanedBooks=require('./api/bookOnLoans');
const reservations=require('./api/reservations');
const register=require('./api/register');
const authenticate=require('./api/authenticate');

mongoose.connect(db, {useNewUrlParser: true, useFindAndModify: false, useCreateIndex:true})
  .then(()=> console.log('Connected!'))
  .catch(err => console.log(err));

app.use('/api/authors', authors);
app.use('/api/publishers', publishers);
app.use('/api/genres', genres);
app.use('/api/books', books);
app.use('/api/bookCopies', bookCopies);
app.use('/api/members', members);
app.use('/api/loanedBooks', loanedBooks);
app.use('/api/reservations', reservations);
app.use('/api/register', register);
app.use('/api/authenticate',authenticate);
app.use('/api/documentation', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.get('/*', (req,res)=>{
  res.sendFile(path.join(__dirname + '/client/dist/client/index.html'));
});

const port= process.env.PORT || 8080;

app.listen(port, ()=> console.log(`Server started at port ${port}`));