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
  roles: [
    {
      type: String,
      required: true,
      enum: ['user', 'admin'],
      default: 'user',
    },
  ],
});

module.exports = mongoose.model('Costomer', schema);
