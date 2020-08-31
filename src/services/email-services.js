/** @format */

'use strict';

const config = require('../config');
const sendGrid = require('sendGrid')(config.sendgridKey);

exports.send = async (to, subject, html) => {
  sendGrid.send({ to, subject, html, from: 'msc@outlook.com.br' });
};
