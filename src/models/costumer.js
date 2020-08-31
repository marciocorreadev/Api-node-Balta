/** @format */

'use strict';

const mongoose = require('mongoose');
const Schemma = mongoose.Schema;

const schema = new Schemma({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
    trim: true,
  },
});

module.exports = mongoose.model('Costomer', schema);
