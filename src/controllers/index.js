const userController = require('./userController');
const reviewController = require('./reviewController');
const tosspaymentController = require('./tosspaymentController')
const likeController = require("./likeController")
const followController = require("./followController")
const followeeController = require("./followeeController")

module.exports = { 
	userController,
	reviewController,
	tosspaymentController,
	likeController,
	followController,
	followeeController
}