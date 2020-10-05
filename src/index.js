const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors')
const router = require('./routes');

const app = express();

app.use(cors())

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.use('/api/v1', router);

app.listen(3333);