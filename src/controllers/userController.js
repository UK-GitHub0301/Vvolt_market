const userService = require('../services/userService');
const { catchAsync, raiseCustomError } = require('../utils/Error');

const kakaoLogin = catchAsync(async (req, res) => {
  const { code } = req.query;
  if (!code) {
    raiseCustomError('CODE_REQUIRED', 400);
  }
  const userData = await userService.kakaoLogin(code);
  res.status(200).json({ userData });
});

const signup = catchAsync(async (req, res) => {
  const [user] = req.userId;
  const { nickname, address, latitude, longitude } = req.body;

  await userService.createUserData(
    user.id,
    nickname,
    address,
    latitude,
    longitude
  );
  res.status(201).end();
});

module.exports = { kakaoLogin, signup };
