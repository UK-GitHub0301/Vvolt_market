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

const createProduct = catchAsync(async (req, res) => {
    const { name, description, price, location, latitude, longitude, product_status_id, category_id, image_url} = req.body;
    const user_id = req.userId[0].id;
    console.log(name, description, price, location, latitude, longitude, product_status_id, category_id, image_url)
    if (!name || !description || !price || !location || !latitude || !longitude || !product_status_id || !category_id || !user_id || !image_url) {
        const err = new Error("KEY_ERROR");
        err.statusCode = 400;
        throw err;
    }

    await productService.createProduct(name, description, price, location, latitude, longitude, product_status_id, category_id, user_id, image_url);
  
    return res.status(201).json({
        message: "POST_SUCCESS",
    });
});

const uploadImage = catchAsync(async (req, res) => {
    const image_url = [];
    await req.files;
    console.log(req.files)
    for(let i=0; i<req.files.length; i++){
        image_url.push(req.files[i].location);
    }
    res.status(200).json({ "image_url" : image_url });
})

const productUpdate = catchAsync(async (req, res) => {
    const { productId } = req.params;
    const { name, description, price, location, latitude, longitude, product_status_id, category_id, image_url } = req.body;
    const userId = req.userId;

    if (!productId || !name || !description || !price || !location || !latitude || !longitude || !product_status_id || !category_id || !image_url || !userId) {
        const err = new Error("KEY_ERROR");
        err.statusCode = 400;
        throw err;
    }
    
    await productService.productUpdate( productId, name, description, price, location, latitude, longitude, product_status_id, category_id, image_url);

    return res.status(200).json({
      message: "UPDATE_SUCCESS",
    });
});

module.exports = { getAllProducts, getProductDetail, getStoreProductList, createProduct, productUpdate, uploadImage };
