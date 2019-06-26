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

mongoose.connect(db)
  .then(()=> console.log('Connected!'))
  .catch(err => console.log(err));

app.use('/authors', authors);

const port= process.env.PORT || 5000;

app.listen(port, ()=> console.log(`Server started at port ${port}`));