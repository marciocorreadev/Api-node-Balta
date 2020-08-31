/** @format */
'use strict';

const mongoose = require('mongoose');
const Product = mongoose.model('Product');

exports.get = async () => {
  return await Product.find(
    {
      active: true,
    },
    'title price slug'
  );
};

exports.getBySlug = async (slug) => {
  const res = await Product.findOne(
    {
      active: true,
      slug: slug,
    },
    'title description slug price tags'
  );
  return res;
};

exports.getByTag = async (tag) => {
  return await Product.find(
    {
      active: true,
      tags: tag,
    },
    'title description slug price tags'
  );
};

exports.getById = async (id) => {
  return await Product.findById(id, 'title description slug price tags');
};

exports.create = async (data) => {
  const product = new Product(data);
  await product.save();
};

exports.update = async (id, data) => {
  await Product.findByIdAndUpdate(id, {
    $set: data,
  });
};
exports.delete = async (id) => {
  await Product.findByIdAndRemove(id);
};
