const express = require('express');
const sportsRouter = require('./routes/sportsRouter');
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
app.use('/test/sports/', sportsRouter);

app.use('*', (req,res,next) => {
    res.status(404).json({status:'failure', message: `${req.originalUrl} not found...`});
});

app.use(globalErrorHandler);
module.exports = app;
