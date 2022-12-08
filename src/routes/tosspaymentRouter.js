const express = require('express');
const tosspaymentRouter= express.Router();
const { tosspaymentController } = require('../controllers');

tosspaymentRouter.post('/confirm', tosspaymentController.tossPaymentConfirm);

module.exports = {tosspaymentRouter};




