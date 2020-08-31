/** @format */
'use strict';

const mongoose = require('mongoose');
const Order = mongoose.model('Order');

exports.get = async (data) => {
  return await Order.find({});
};
exports.create = async (data) => {
  const order = new Order(data);
  await order.save();
};
