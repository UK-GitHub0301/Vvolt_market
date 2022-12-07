const productDao = require('../models/productDao');
const { makeProductQueryBuilders } = require('../utils/productQueryBuilder');
const { raiseCustomError } = require('../utils/Error');
const getProductList = async (params) => {
  const { sort, ...rest } = params;

  const sortProducts = (sort) => {
    const sortSet = {
      new: 'p.created_at DESC',
      pHigh: 'po.price',
      pLow: 'po.price DESC',
    };
    return sort ? `ORDER BY ${sortSet[sort]}` : `ORDER BY p.created_at DESC`;
  };

  const builders = makeProductQueryBuilders(rest);
  return await productDao.getProductList(builders, sortProducts(sort));
};

const getProductDetail = async (productId) => {
  if (!productId) {
    raiseCustomError('NO EIXISTS PRODUCT', 400);
  }
  const productDetail = await productDao.getproductDetail(productId);
  const storeInfor = await productDao.getStoreInfor(productId);
  const storeReview = await productDao.getStoreReivew(productId);
  return { productDetail, storeInfor, storeReview };
};

const getStoreProductList = async (sotreId) => {
  return await productDao.getStoreProductList(sotreId);
};
module.exports = { getProductList, getProductDetail, getStoreProductList };
