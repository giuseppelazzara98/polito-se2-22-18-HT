'use strict';

const express = require('express');
const morgan = require('morgan');
const cors = require('cors');

const hikeRouter = require('./routers/hike_router');

// init express
const app = new express();
const port = 3001;

//setup and enable Cors
const corsOptions = {
	origin: 'http://localhost:3000',
	optionsSuccessStatus: 200,
	credentials: true
};
app.use(cors(corsOptions));

app.use(morgan('dev'));
app.use(express.json());

/******API******/

app.use('/api', hikeRouter);

// activate the server
app.listen(port, () => {
	console.log(`Server listening at http://localhost:${port}`);
});

module.exports = app;