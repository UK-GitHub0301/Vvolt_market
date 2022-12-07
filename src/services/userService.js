const userDao = require('../models/userDao');
const axios = require('axios');
const jwt = require('jsonwebtoken');
const { raiseCustomError } = require('../utils/Error');
let isMember = false;

const kakaoLogin = async (code) => {
  const result = await axios({
    url: 'https://kauth.kakao.com/oauth/token',
    method: 'POST',
    data: {
      grant_type: 'authorization_code',
      client_id: process.env.CLIENT_ID,
      redirect_uri: process.env.REDIRECT_URI,
      code: code,
    },
    headers: {
      'content-type': 'application/x-www-form-urlencoded;charset=utf-8',
    },
  });
  const kakaoAccessToken = result.data.access_token;

  const userData = await axios({
    method: 'POST',
    url: 'https://kapi.kakao.com/v2/user/me',
    headers: {
      'Content-type': 'application/x-www-form-urlencoded;charset=utf-8',
      Authorization: `Bearer ${kakaoAccessToken}`,
    },
  });

  const kakaoId = userData.data.id;
  const name = userData.data.properties.nickname;

  const [userId] = await userDao.getUserBysocialId(kakaoId);
  if (userId) {
    isMember = true;
  }
  if (!userId) {
    await userDao.insertSocialId(kakaoId, name);
    isMember = false;
  }
  const [user] = await userDao.getUserBysocialId(kakaoId);
  const secretKey = process.env.JWT_SECRET;
  const accessToken = jwt.sign(
    {
      data: user.id,
    },
    secretKey,
    {
      subject: 'accessToken',
      expiresIn: '30 days',
    }
  );

  return { accessToken, isMember };
};

const createUserData = async (
  userId,
  nickname,
  address,
  latitude,
  longitude
) => {
  const user = await userDao.getUserById(userId);
  if (user.nickname) {
    raiseCustomError('USER_ALREADY_EXISTS', 400);
  }
  await userDao.insertUserData(userId, nickname, address, latitude, longitude);
  isMember = true;

  return isMember;
};

module.exports = {
  kakaoLogin,
  createUserData,
};
