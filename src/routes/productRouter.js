const express = require('express');
const productRouter = express.Router();

const productController = require('../controllers/productController');
const { checkAuth } = require('../utils/checkAuth');

productRouter.get('/', productController.getAllProducts);
productRouter.get(
  '/store/:storeId',
  checkAuth,
  productController.getStoreProductList
);
productRouter.get('/:productId', checkAuth, productController.getProductDetail);

module.exports = { productRouter };
