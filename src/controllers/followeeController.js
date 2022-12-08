const  followeeService  = require('../services/followeeService')

const createFolloweeByUsername = async(req,res)=>{
    try {
        const followee = req.userId
        const follower =req.body
     const result = await followeeService.createFolloweeByUsername(follow, followee);
    return res.status(201).json({message: 'Success!!!!' });
    } catch (err) {
        console.log(err);
        return res.status(err.statusCode || 500).json({message: err.message})
    }
    };

const getFolloweeByUsername = async (req, res) => {
    const {userId} =req.params
    const follow_List = await followeeService.getFolloweeByUsername(userId);
    res.status(200).json({followee_List: follow_List});
};


module.exports = {
    getFolloweeByUsername,
    createFolloweeByUsername
    }