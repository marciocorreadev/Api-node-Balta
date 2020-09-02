/** @format */
'use strict';

const ValidationContract = require('../validators/fluent-validator');
const repository = require('../repositories/customer-repository');
const md5 = require('md5');
const emailService = require('../services/email-services');
const authService = require('../services/auth-service');

exports.post = async (req, res, next) => {
  let contract = new ValidationContract();
  contract.hasMinLen(req.body.name, 3, 'O nome deve conter pelo menos 3 caracteres.');
  contract.isEmail(req.body.email, 'Email inválido.');
  contract.hasMinLen(req.body.password, 6, 'A senha deve conter pelo menos 3 caracteres.');

  if (!contract.isValid()) {
    res.status(400).send(contract.errors()).end();
    return;
  }
  try {
    await repository.create({
      name: req.body.name,
      email: req.body.email,
      password: md5(req.body.password + global.SALT_KEY),
      roles: ['user'],
    });

    emailService.send(
      req.body.email,
      'Bem vindo ao Node Store',
      global.EMAIL_TMPL.replace('{0}', req.body.name)
    );

    res.status(201).send({ message: 'Cliente cadastrado com sucesso' });
  } catch (error) {
    res.status(500).send({ error, message: 'Falha ao salvar.' });
  }
};,

exports.authenticate = async (req, res, next) => {
  try {
    const customer = await repository.authenticate({
      email: req.body.email,
      password: md5(req.body.password + global.SALT_KEY),
    });

    if (!customer) {
      res.status(404).send({ message: 'Token ou senha inválidos!' });
      return;
    }

    const token = await authService.generateToken({
      id: customer._id,
      email: customer.email,
      name: customer.name,
    });

    res.status(200).send({ token: token, data: { email: customer.email, name: customer.name } });
  } catch (error) {
    res.status(500).send({ error, message: 'Falha ao gerar token.' });
  }
};
exports.refreshToken = async (req, res, next) => {
  try {
    const token = req.body.token || req.query.token || req.headers['x-access-token'];
    const data = await authService.decodeToken(token);

    const customer = await repository.getById(data.id);

    if (!customer) {
      res.status(404).send({ message: 'Cliente não encontrado!' });
      return;
    }

    const tokenData = await authService.generateToken({
      id: customer._id,
      email: customer.email,
      name: customer.name,
    });

    res
      .status(200)
      .send({ token: tokenData, data: { email: customer.email, name: customer.name } });
  } catch (error) {
    res.status(500).send({ error, message: 'Falha ao gerar token.' });
  }
};

exports.get = async (req, res, next) => {
  try {
    const data = await repository.get();
    res.status(200).send(data);
  } catch (error) {
    res.status(500).send({ error, message: 'Falha ao processar sua requisição.' });
  }
};
