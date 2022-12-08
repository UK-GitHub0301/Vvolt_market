const { appDataSource } = require("./dataSource")

const createLikeByUsername = async (userId, productId) => {
    await appDataSource.query(
        `INSERT INTO likes(
            user_id,
            
            product_id
        ) VALUES (?, ?);
        `,
        [userId, productId]
    ); 
};

const getLikeByUsername = async (userId) => {

	const Like = await appDataSource.query(
        `SELECT
            l.user_id,
            p.id as productId,
            p.name as productName,
            p.created_at as registerData,
            p.price as productPrice,
            p.location,
            JSON_ARRAYAGG(pi.image_url)
            as images
        FROM products p
        INNER JOIN likes l ON l.product_id = p.id
        INNER JOIN product_images pi ON p.id = pi.product_id
        WHERE l.user_id = ?
        GROUP BY pi.product_id;
	    `, 
        [userId]
	)
	return Like
}


const deleteLike = async (userId, productId) => {
    await appDataSource.query(
      `
        DELETE
        FROM likes l 
        WHERE l.user_id = ? and l.product_id = ?
        `,
      [userId, productId]
    );
  };

  const getLike = async (userId, producId) => {
    const [likeData] = await appDataSource.query(
      `SELECT EXISTS(
          SELECT *
          FROM likes l
          WHERE l.user_id = ? AND l.product_id = ?
          ) AS existence
          `,
      [userId, producId]
    );
    return likeData;
  };


module.exports = {
    getLikeByUsername,
    createLikeByUsername,
    deleteLike,
    getLike
}