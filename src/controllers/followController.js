const  followService  = require('../services/followService')

const createFollowByUsername = async(req,res)=>{
    try {
        const follow = req.userId
        const followee =req.body
     const result = await followService.createFollowByUsername(follow, followee);
    return res.status(201).json({message: 'Success!!!!' });
    } catch (err) {
        console.log(err);
        return res.status(err.statusCode || 500).json({message: err.message})
    }
    };

const getFollowByUsername = async (req, res) => {
    const {userId} =req.params
    const followee_List = await followService.getFollowByUsername(userId);
    res.status(200).json(followee_List);
};

const postFollow = async (req, res) => {
  const { followeeId } = req.params;
  const [user] = req.userId;

  const followData = await followService.postFollow(user.id, followeeId);
  return res.status(201).send();
};

module.exports = {
    getFollowByUsername,
    createFollowByUsername,
    postFollow
    }