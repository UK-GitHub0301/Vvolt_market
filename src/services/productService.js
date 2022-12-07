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

const createProduct = async (name, description, price, location, latitude, longitude, product_status_id, category_id, user_id, image_url) => {
  return await productDao.createProduct(name, description, price, location, latitude, longitude, product_status_id, category_id, user_id, image_url);
};

const productUpdate = async ( productId, name, description, price, location, latitude, longitude, product_status_id, category_id, image_url ) => {

  const setParams ={ name, description, price, location, latitude, longitude, product_status_id, category_id };

  const makeProductQueryBuilders = (params) => { 
      let setClauses = Object.entries(params).map( 
          function ([key, value]){
              if(key === "name" || key === "description" || key === "location" ){ 
                  return `${key} = '${value}'`;
              };                                                                                      
              return `${key} = ${value}`;
          }
      );
      setClauses = setClauses.filter(el => el.indexOf("undefined")===-1)
      return `SET ${setClauses.join(', ')}`;
  }; 
  
  const imageBulk = image_url.map((value) => {
      return `(${productId}, '${value}')`;
  })

  const setClause = makeProductQueryBuilders(setParams);
  const imageBulks = imageBulk.join(', ');

  return await productDao.productUpdate(setClause, imageBulks, productId);
};

module.exports = { getProductList, getProductDetail, getStoreProductList, createProduct, productUpdate };