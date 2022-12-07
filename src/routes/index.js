const routes = require('express').Router();

const { productRouter } = require('../routes/productRouter');
const { orderRouter } = require('./orderRouter');
const { userRouter } = require('./userRouter');

routes.use('/products', productRouter);
routes.use('/orders', orderRouter);
routes.use('/users', userRouter);

module.exports = { routes };
