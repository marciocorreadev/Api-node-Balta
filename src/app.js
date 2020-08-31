/** @format */

'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const config = require('./config');

const app = express();
const router = express.Router();

mongoose.connect(config.connectionString);

const Product = require('./models/product.js');
const Costumer = require('./models/costumer.js');
const Order = require('./models/order.js');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

const index = require('./routes/index-route');
const product = require('./routes/product-route');
const customer = require('./routes/customer-route');
const order = require('./routes/order-route');

app.use('/', index);
app.use('/products', product);
app.use('/customer', customer);
app.use('/order', order);

module.exports = app;
