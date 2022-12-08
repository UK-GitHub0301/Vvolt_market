const express = require('express');
const productRouter = express.Router();
const { upload } = require('../utils/s3');

const productController = require('../controllers/productController');
const { checkAuth } = require('../utils/checkAuth');

productRouter.get('/', productController.getAllProducts);
productRouter.get('/store/:storeId', productController.getStoreProductList);
productRouter.get('/:productId', checkAuth, productController.getProductDetail);
productRouter.post("", checkAuth, productController.createProduct);
productRouter.post("/image", checkAuth, upload.array('image', 5), productController.uploadImage)
productRouter.patch("/:productId", checkAuth, productController.productUpdate);

module.exports = { productRouter };