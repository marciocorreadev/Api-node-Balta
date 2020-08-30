/** @format */
'use strict';

const mongoose = require('mongoose');
const { findByIdAndUpdate } = require('../models/product');
const Product = mongoose.model('Product');
const ValidationContract = require('../validators/fluent-validator');
const repository = require('../repositories/product.repository');

exports.get = (req, res, next) => {
  repository
    .get()
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
  repository
    .getBySlug(req.params.slug)
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
  repository
    .getByTag(req.params.tag)
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
  repository
    .getById(req.params.id)
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

  repository
    .create(req.body)
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
  repository
    .update()
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
  repository
    .delete()
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
