const likeDao = require("../models/likeDao");
const productDao = require('../models/productDao');

const createLikeByUsername = async (productId,  userId, contents, rating) => {
    return await likeDao.createLikeByUsername(productId,  userId, contents, rating)

}

const getLikeByUsername = async (userId) => {
    return await likeDao.getLikeByUsername(userId)
};

const getLike = async (userId, productId) => {
  const isLike = await likeDao.getLike(userId, productId);
  if(isLike.existence == 1) return true;
  return false;
}


const postLike = async (userId, productId) => {
    const checkId = await likeDao.getLike(userId, productId);
    if (!checkId) {
      const err = new Error("유저가 존재하지 않습니다.");
      err.statusCode = 400;
      throw err;
    }
  
    const likeData = await likeDao.getLike(userId, productId);
    const EXISTS = Number(likeData?.existence);
    if (EXISTS === 1) {
      await likeDao.deleteLike(userId, productId);
    } else {
      await likeDao.createLikeByUsername(userId, productId);
    }
};

module.exports = {
    getLikeByUsername,
    createLikeByUsername,
    postLike, getLike
}