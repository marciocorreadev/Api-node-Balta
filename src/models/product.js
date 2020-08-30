/** @format */

'use strict';

const mongoose = require('mongoose');
const Schemma = mongoose.Schema;

const schema = new Schemma({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    required: true,
  },
  slug: {
    type: String,
    required: true,
    trim: true,
    index: true,
    unique: true,
  },
  price: {
    type: Number,
    required: true,
  },
  active: {
    type: Boolean,
    required: true,
    default: true,
  },
  tags: [
    {
      type: String,
      required: true,
    },
  ],
});

module.exports = mongoose.model('Product', schema);
