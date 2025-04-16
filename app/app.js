const express = require('express');
const app = express();
const cors = require('cors');
const {
	handleCustomErrors,
	handlePsqlErrors,
	handleServerErrors,
	handleMongoErrors
} = require('../controllers/errors.controllers');
const apiRouter = require('./api-router');

const db = require('../db/connection.js'); // don't know if need these?
const mongodb = require('../db/mongodb.js');

app.use(cors());

app.use(express.json());

app.use('/api', apiRouter);

app.use(handleCustomErrors);

app.use(handlePsqlErrors);

app.use(handleMongoErrors);

app.use(handleServerErrors);

app.all(/(.*)/, (req, res) => {
	res.status(404).send({ msg: 'Path not found.' });
});


module.exports = app;
