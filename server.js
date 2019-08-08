const http = require ('http');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config({path: './config.env'});
const fs = require('fs');
const app = require ('./app');




// connect to database...
mongoose
  .connect('mongodb://localhost:27017/sportsWebApp', {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false
  })
  .then(() => console.log('DB connection successful!'))
  .catch(err => {
    console.log('ERROR:could not connect to DB...');
  });


const PORT = 3000;
app.listen(PORT, () => {
	//console.log(`Server listening on port ${PORT}`);
});
