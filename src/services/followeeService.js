const followeeDao = require("../models/followeeDao");

const createFolloweeByUsername = async (pfollower, followee) => {
    return await followeeDao.createFolloweeByUsername(follower, followee)

}

const getFolloweeByUsername = async (userId) => {
    return await followeeDao.getFolloweeByUsername(userId)
    };


module.exports = {
    getFolloweeByUsername,
    createFolloweeByUsername,
}