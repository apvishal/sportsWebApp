const express = require('express');
const router = require('./routes/router');
const globalErrorHandler = require('./controller/errorController');

const app = express();
/*
app.get('/', (req, res) => {
	console.log('/ was accessed...');
	res.send("Hello there friend...");
});
*/

app.use(express.json());
app.use(express.static(`${__dirname}/public`));

app.use('/test/', router);

app.use('*', (req,res,next) => {
    res.status(404).json({status:'failure', message: `${req.originalUrl} not found...`});
});

app.use(globalErrorHandler);
module.exports = app;
