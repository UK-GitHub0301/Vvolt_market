const orderService = require('../services/orderService');
const { catchAsync } = require('../utils/Error');

const getMyOrders = catchAsync(async (req, res) => {
  const [user] = req.userId;

  const orderData = await orderService.getMyOrders(user.id);
  return res.status(200).json(orderData);
});

module.exports = { getMyOrders };
