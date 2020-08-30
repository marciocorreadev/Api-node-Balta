/** @format */
'use strict';

const mongoose = require('mongoose');
const { findByIdAndUpdate } = require('../models/product');
const Product = mongoose.model('Product');
const ValidationContract = require('../validators/fluent-validator');

exports.get = (req, res, next) => {
  Product.find({ active: true }, 'title slug price')
    .then((data) => {
      res.status(200).send(data);
    })
    .catch((error) => {
      res.status(400).send({
        message: 'Falha ao realizar a pesquisa.',
        error,
      });
    });
};

exports.getBySlug = (req, res, next) => {
  Product.findOne({ active: true, slug: req.params.slug }, 'title description slug price tags')
    .then((data) => {
      res.status(200).send(data);
    })
    .catch((error) => {
      res.status(400).send({
        message: 'Falha ao realizar a pesquisa.',
        error,
      });
    });
};

exports.getByTag = (req, res, next) => {
  Product.find({ active: true, tags: req.params.tag }, 'title description slug price tags')
    .then((data) => {
      res.status(200).send(data);
    })
    .catch((error) => {
      res.status(400).send({
        message: 'Falha ao realizar a pesquisa.',
        error,
      });
    });
};

exports.getById = (req, res, next) => {
  Product.findById(req.params.id, 'title description slug price tags')
    .then((data) => {
      res.status(200).send(data);
    })
    .catch((error) => {
      res.status(400).send({
        message: 'Falha ao realizar a pesquisa.',
        error,
      });
    });
};

exports.post = (req, res, next) => {
  let contract = new ValidationContract();

  contract.hasMinLen(req.body.title, 3, 'O título deve conter pelo menos 3 caracteres.');
  contract.hasMinLen(req.body.slug, 3, 'O slug deve conter pelo menos 3 caracteres.');
  contract.hasMinLen(req.body.description, 3, 'A descrição deve conter pelo menos 3 caracteres.');

  if (!contract.isValid()) {
    res.status(400).send(contract.errors()).end();
    return;
  }

  const product = new Product(req.body);
  product
    .save()
    .then((e) => {
      res.status(201).send({
        message: 'Produto cadastrado com sucesso.',
        produto: req.body,
      });
    })
    .catch((e) => {
      res.status(400).send({
        message: 'Falha ao cadastrar produto.',
        data: e,
      });
    });
};

exports.put = (req, res, next) => {
  Product.findByIdAndUpdate(req.params.id, {
    $set: {
      title: req.body.title,
      description: req.body.description,
      price: req.body.price,
      tags: req.body.tags,
      active: req.body.active,
      slug: req.body.slug,
    },
  })
    .then((e) => {
      res.status(200).send({
        message: 'Produto atualizado com sucesso.',
        produto: req.body,
      });
    })
    .catch((e) => {
      res.status(400).send({
        message: 'Falha ao atualizar o produto.',
        data: e,
      });
    });
};

exports.delete = (req, res, next) => {
  Product.findByIdAndRemove(req.body.id)
    .then((e) => {
      res.status(200).send({
        message: 'Produto removido com sucesso.',
      });
    })
    .catch((e) => {
      res.status(400).send({
        message: 'Falha ao remover o produto.',
        data: e,
      });
    });
};
