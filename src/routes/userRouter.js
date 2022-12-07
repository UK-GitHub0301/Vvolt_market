const userRouter = require('express').Router();

const userController = require('../controllers/userController');
const { checkAuth } = require('../utils/checkAuth');
const { upload } = require('../utils/s3');

userRouter.put("", checkAuth, upload.single('image'), userController.userUpdate);
userRouter.get('/kakaoLogin', userController.kakaoLogin);
userRouter.post('/signup', checkAuth, userController.signup);
userRouter.get("/:userId", checkAuth, userController.getUserDetail);

module.exports = { userRouter };


