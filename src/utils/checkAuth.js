const jwt = require('jsonwebtoken');
const secretKey = process.env.JWT_SECRET;
const { getUserById } = require('../models/userDao');
const { raiseCustomError } = require('./Error');

const checkAuth = async (req, res, next) => {
  try {
    const accessToken = req.headers.authorization;
    if (!accessToken) {
      raiseCustomError('login required', 401);
    }
    const payLoad = jwt.verify(accessToken, secretKey);
    const user = await getUserById(payLoad.data);
    if (!user) {
      raiseCustomError('signup required', 401);
    }
    req.userId = user;
    next();
  } catch (err) {
    next(err);
  }
};

module.exports = { checkAuth };
