const productService = require('../services/productService');
const { catchAsync } = require('../utils/Error');

const getAllProducts = catchAsync(async (req, res) => {
  const productsData = await productService.getProductList(req.query);
  res.status(200).json(productsData);
});

const getProductDetail = catchAsync(async (req, res) => {
  const { productId } = req.params;

  const productDetailData = await productService.getProductDetail(productId);
  res.status(200).json(productDetailData);
});

const getStoreProductList = catchAsync(async (req, res) => {
  const { storeId } = req.params;
  const myProductList = await productService.getStoreProductList(storeId);
  res.status(200).json(myProductList);
});

module.exports = { getAllProducts, getProductDetail, getStoreProductList };
