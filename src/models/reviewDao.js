const { appDataSource } = require("./dataSource")

const createReviewByusername = async (productId, userId, contents, rating) => {
	
	const createUser = await appDataSource.query(
    `INSERT INTO reviews(
        product_id,
        user_id,
        contents,
        rating
    ) VALUES (?, ?, ?, ?);
    `,
    [productId, userId, contents,rating]
    ); 
	return createUser;

};

const getReviewByusername = async (userId) => {

	const user = await appDataSource.query(`
    SELECT
	product_id as product_id, 
	reviews.user_id as buyer_id, 
	reviews.contents as reviewContent, 
	reviews.rating as rate,
	users.nickname as writerName,
	users.user_image as writerImg
	FROM reviews
	INNER JOIN products ON reviews.product_id = products.id
	LEFT JOIN users ON reviews.user_id = users.id
	WHERE products.user_id=?`, [userId]
	)
	return user
}


const deleteReview = async(userId, productId)=>{
    const deleteReview= await appDataSource.query(
        `DELETE FROM reviews r
        WHERE r.product_id=? AND r.user_id=?
        `,[productId, userId]
    )
    return deleteReview
}

module.exports = {
    getReviewByusername,
    createReviewByusername,
	deleteReview
}

