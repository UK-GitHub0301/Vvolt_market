// const { add } = require('typeorm');
const  tosspaymentService  = require('../services/tossPaymentService')
// const { catchAsync } = require("../utils/error")

const tossPaymentConfirm = async(req,res)=>{
    try {
        const {amount, orderId, paymentKey} =req.body
        if ( !amount || !orderId || !paymentKey ) {
            return res.status(404).json({ message: 'Input Error' });
    } const result = await tosspaymentService.tossPaymentConfirm(amount, orderId, paymentKey);
    return res.status(201).json({message: 'Input Success!!!!' });
    } catch (err) {
        console.log(err);
        return res.status(err.statusCode || 500).json({message: err.message})
    }
    };

    module.exports = {
        tossPaymentConfirm
    }