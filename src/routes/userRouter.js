const userRouter = require('express').Router();

const userController = require('../controllers/userController');
const { checkAuth } = require('../utils/checkAuth');

userRouter.get('/kakaoLogin', userController.kakaoLogin);
userRouter.post('/signup', checkAuth, userController.signup);

module.exports = { userRouter };
