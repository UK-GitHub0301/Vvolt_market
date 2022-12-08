const reviewDao = require("../models/reviewDao");

const createReviewByusername = async (productId,  userId, contents, rating) => {
    return await reviewDao.createReviewByusername(productId, userId, contents, rating)

}

const getReviewByusername = async (userId) => {
    return await reviewDao.getReviewByusername(userId)
    };

const deleteReview = async(userId, productId) => {
        return await reviewDao.deleteReview(userId, productId);
    }

module.exports = {
    getReviewByusername,
    createReviewByusername,
    deleteReview
}