const userService = require('../services/userService');
const followService = require('../services/followService');
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

const getUserDetail = catchAsync(async (req, res) => {
    const { userId } = req.params;
    const userIdByToken = req.userId[0].id;
    const flag = (userId, userIdByToken) => {
        return userId == userIdByToken ? true : false;
    };
    
    const [ shopInfo ] = await userService.getUserDetail(userId);
    const [ myInfo ] = await userService.getUserDetail(userIdByToken);
    const isFollow = await followService.getFollow(userIdByToken, userId);
    return res.status(200).json(
        {
            "isMyShop" : flag(userId, userIdByToken),
            "isFollow" : isFollow,
            "myData" : {
                "writerId" : myInfo.sellerId, 
                "writerName" : myInfo.sellerName,
                "writerImg" : myInfo.sellerImg,
                "address" : myInfo.address,
                "latitude" : myInfo.latitude,
                "longitude" : myInfo.longitude,
                "realName" : myInfo.name
            },
            "shopData" : shopInfo
        }
    );
});

const userUpdate = catchAsync(async (req, res) => {
    
    const userId = req.userId[0].id;
    const { nickname, description, address, latitude, longitude } = req.body;
    
    let user_image = "";
    if(req.file){
      user_image = req.file.location;
    }

    // if (!userId || !nickname && !user_image && `${description}`=== "undefined" && !address && !latitude && !longitude) {
    //   const err = new Error("KEY_ERROR");
    //   err.statusCode = 400;
    //   throw err;
    // }
    
    await userService.userUpdate(userId, nickname, user_image, description, address, latitude, longitude);
  
    return res.status(200).json({
      message: "USER_MODIFY_SUCCESS",
    });
  });

module.exports = { kakaoLogin, signup, getUserDetail, userUpdate };
