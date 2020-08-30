/** @format */
'use strict';

const mongoose = require('mongoose');
const Product = mongoose.model('Product');

exports.get = () => {
  return Product.find(
    {
      active: true,
    },
    'title price slug'
  );
};

exports.getBySlug = (slug) => {
  return Product.findOne(
    {
      active: true,
      slug: slug,
    },
    'title description slug price tags'
  );
};

exports.getByTag = (tag) => {
  return Product.find({ active: true, tags: tag }, 'title description slug price tags');
};

exports.getById = (id) => {
  return Product.findById(id, 'title description slug price tags');
};

exports.create = (data) => {
  const product = new Product(data);
  return product.save();
};

exports.update = (id, data) => {
  return Product.findByIdAndUpdate(id, {
    $set: data,
  });
};
exports.delete = (id) => {
  return Product.findByIdAndRemove(id);
};
