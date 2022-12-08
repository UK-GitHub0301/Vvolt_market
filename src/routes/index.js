const routes = require('express').Router();

const { productRouter } = require('../routes/productRouter');
const { orderRouter } = require('./orderRouter');
const { userRouter } = require('./userRouter');
const {reviewRouter} = require("./reviewRouter")
const {tosspaymentRouter} = require("./tosspaymentRouter")
const {likeRouter} = require("./likesRouter")
const {followeeRouter} = require("./followeeRouter")
const {followRouter} = require("./followRouter")

routes.use('/products', productRouter);
routes.use('/orders', orderRouter);
routes.use('/users', userRouter);
routes.use('/review', reviewRouter);
routes.use('/tossPayment', tosspaymentRouter);
routes.use("/likes", likeRouter);
routes.use("/followee", followeeRouter);
routes.use("/follow", followRouter);

module.exports = { routes };
