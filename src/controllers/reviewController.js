const  reviewService  = require('../services/reviewService')

const createReviewByusername = async(req,res)=>{
    try {
        const [user] = req.userId
        const { productId ,contents,rating}=req.body
        // if ( !productId || !userId || !contents || !rating ) {
        //     return res.status(404).json({ message: 'Key Error' });
     const result = await reviewService.createReviewByusername(productId, user.id, contents, rating);
    return res.status(201).json({message: 'Success!!!!' });
    } catch (err) {
        console.log(err);
        return res.status(err.statusCode || 500).json({message: err.message})
    }
    };

const getReviewByusername = async (req, res) => {

    const {userId} =req.params
    const UserReview = await reviewService.getReviewByusername(userId);
    res.status(200).json({review_list: UserReview});
};

const deleteReview = async (req, res) => {
    const {userId} = req.params
    const { productId}=req.body
    if(!userId) 
    {
        const error = new Error("Review id is not exist")
        error.statusCode=400;
        throw error;
    }
    const deleteReview= await reviewService.deleteReview(userId, productId)
    res.status(200).json({message : "delete selected Reviews"})
};



module.exports = {
    getReviewByusername,
    createReviewByusername,
    deleteReview
    }