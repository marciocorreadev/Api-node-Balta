/** @format */

'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const app = express();
const router = express.Router();

mongoose.connect(
  'mongodb+srv://marcio:marcio@cluster0.kiaxr.azure.mongodb.net/nodestr?retryWrites=true&w=majority'
);

const Product = require('./models/product.js');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

const index = require('./routes/index-route');
const product = require('./routes/product-route');

app.use('/', index);
app.use('/products', product);

module.exports = app;
