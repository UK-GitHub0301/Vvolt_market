const  likeService  = require('../services/likeService')

const createLikeByUsername = async(req,res)=>{
    try {
        const {userId} =req.params
        const { productId ,contents,rating}=req.body
        if ( !productId || !userId || !contents || !rating ) {
            return res.status(404).json({ message: 'Key Error' });
    } const result = await likeService.createReviewByusername(productId, userId, contents, rating);
    return res.status(201).json({message: 'Success!!!!' });
    } catch (err) {
        console.log(err);
        return res.status(err.statusCode || 500).json({message: err.message})
    }
    };

const getLikeByusername = async (req, res) => {

    const {userId} =req.params
    const LikeReview = await likeService.getLikeByUsername(userId);
    res.status(200).json({Likes_list: LikeReview});
};


const deleteLike = async (req, res) => {
    const { productId } = req.params;
    const [user] = req.userId;
  
    const result = await likeService.postLike(user.id, productId);
    return res.status(201).send();
  };
  
module.exports = {
    getLikeByusername,
    createLikeByUsername,
    deleteLike
    }