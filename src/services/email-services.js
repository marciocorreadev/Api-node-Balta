/** @format */

'use strict';

const config = require('../config');
const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(config.sendgridKey);

exports.send = async (to, subject, body) => {
  const msg = {
    to: to,
    from: 'msc@outlook.com.br', // Use the email address or domain you verified above
    subject: subject,
    text: 'Bem vindo ao curso de node!',
    html: body,
  };
  sgMail.send(msg).then(
    () => {
      console.log('email enviado com sucesso');
    },
    (error) => {
      console.error(error);

      if (error.response) {
        console.error(error.response.body);
      }
    }
  );
};
