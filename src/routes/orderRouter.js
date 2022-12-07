const orderRouter = require('express').Router();
const { checkAuth } = require('../utils/checkAuth');
const orderController = require('../controllers/orderController');

orderRouter.get('/', checkAuth, orderController.getMyOrders);

module.exports = { orderRouter };
