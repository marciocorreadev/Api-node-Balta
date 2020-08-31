/** @format */
'use strict';

const mongoose = require('mongoose');
const Costomer = mongoose.model('Costomer');

exports.create = async (data) => {
  const costomer = new Costomer(data);
  await costomer.save();
};

exports.get = async (data) => {
  return await Costomer.find({});
};
