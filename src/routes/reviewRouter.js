const reviewRouter = require('express').Router();
const{checkAuth} = require('../utils/checkAuth')
const reviewController = require('../controllers/reviewController');

reviewRouter.post('/',checkAuth, reviewController.createReviewByusername);
reviewRouter.get('/:userId', reviewController.getReviewByusername);
reviewRouter.delete('/:userId', reviewController.deleteReview);

module.exports = {reviewRouter};