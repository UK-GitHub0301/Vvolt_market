const orderDao = require('../models/orderDao');

const getMyOrders = async (userId) => {
  return await orderDao.getMyOrders(userId);
};

module.exports = { getMyOrders };
