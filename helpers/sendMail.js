const sgMail = require('@sendgrid/mail');
const { catchAsync } = require('../utils');

require('dotenv').config();

const { SENDGRID_API_KEY } = process.env;

sgMail.setApiKey(SENDGRID_API_KEY);

const sendEmail = catchAsync(async (data) => {
  const email = { ...data, from: 'aliesia@ukr.net' };

  sgMail
    .send(email)
    .then(() => {
      console.log('Email sent');
    })
    .catch((error) => {
      throw error;
    });
});

module.exports = sendEmail;
