const http = require ('http');
const mongoose = require('mongoose');
const app = require ('./app');
const fs = require('fs');


// connect to database...
mongoose
  .connect('mongodb://localhost:27017/sportsWebApp', {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false
  })
  .then(() => console.log('DB connection successful!'));


const PORT = 3000;
app.listen(PORT, () => {
	console.log(`Server listening on port ${PORT}`);
});
