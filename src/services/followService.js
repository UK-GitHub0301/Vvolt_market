const followDao = require("../models/followerDao");

const createFollowByUsername = async (follower, followee) => {
    return await followDao.createFollowByUsername(follower, followee)

}

const getFollowByUsername = async (userId) => {
    return await followDao.getFollowByUsername(userId)
    };

const postFollow = async (userId, followeeId) => {
  const checkId = await followDao.getFollow(userId, followeeId);
  if (!checkId) {
    const err = new Error("유저가 존재하지 않습니다.");
    err.statusCode = 400;
    throw err;
  }

  const followData = await followDao.getFollow(userId, followeeId);
  const EXISTS = Number(followData?.existence);
  console.log(EXISTS)
  if (EXISTS === 1) {
    await followDao.deleteFollow(userId, followeeId);
  } else {
    await followDao.createFollow(userId, followeeId);
  }
};

const getFollow = async (userId, followeeId) => {
    const followData = await followDao.getFollow(userId, followeeId);
    if (followData.existence == 1) return true;
    return false; 
}

module.exports = {
    getFollowByUsername,
    createFollowByUsername,
    postFollow,
    getFollow
}