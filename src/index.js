const express = require('express');
const bodyParser = require('body-parser');
const router = require('./routes');
const Authorization = require('./shared/Authorization');

const app = express();

app.use(Authorization)
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.use('/api/v1', router);

app.listen(3333);