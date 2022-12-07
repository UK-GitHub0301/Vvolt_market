const { appDataSource } = require('./dataSource');

const getMyOrders = async (userId) => {
  return await appDataSource.query(
    `
    SELECT
    p.id productId,
    p.name productName,
    p.price productPrice,
    p.created_at registerDate,
    p.location location,
    pi.images
    FROM products AS p
    LEFT JOIN (
      SELECT 
        product_id,
        JSON_ARRAYAGG(
            image_url
        ) as images
      FROM product_images
      GROUP BY product_id
    ) pi ON p.id = pi.product_id
    INNER JOIN orders ON orders.product_id = p.id
    WHERE orders.user_id = ?
    `,
    [userId]
  );
};

module.exports = { getMyOrders };
