const { appDataSource } = require('./dataSource');

const getProductList = async (builders, sort) => {
  return await appDataSource.query(
    `
        SELECT DISTINCT
        p.id productId,
        p.name productName,
        p.price productPrice,
        p.created_at registerDate,
        p.location location,
        p.latitude lat,
        p.longitude lng,
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
        INNER JOIN categories ON categories.id = p.category_id
        INNER JOIN orders ON orders.product_id != p.id
        ${builders}
        ${sort}
        `
  );
};

const getproductDetail = async (productId) => {
  return await appDataSource.query(
    `
        SELECT DISTINCT
          p.name productName,
          p.price productPrice,
          p.description productDesc,
          p.product_status_id productStatusId,
          p.location location,
          p.latitude lat,
          p.longitude lng,
          pi.images,
          (SELECT
            COUNT(l.id) Count
            FROM likes l
            WHERE l.product_id = p.id
          ) likeCount
          FROM products p
          INNER JOIN users AS u ON u.id = p.user_id
          LEFT JOIN (
            SELECT 
              product_id,
              JSON_ARRAYAGG(
                image_url
              ) as images
            FROM product_images
            GROUP BY product_id
          ) pi ON p.id = pi.product_id
          WHERE p.id = ?  
      `,
    [productId]
  );
};

const getStoreInfor = async (productId) => {
  return await appDataSource.query(
    `
      SELECT DISTINCT
        u.id storeId,
        u.nickName,
        u.user_image userImage,
        p.price,
        pi.images,
        (SELECT
          COUNT(p.id) Count
          FROM products p
          WHERE p.user_id = u.id
        ) productCount,
        (SELECT
          COUNT(f.id) Count
          FROM follow f
          WHERE f.followee = u.id
        ) followerCount
      FROM products p
      LEFT JOIN users u ON p.user_id = u.id
      LEFT JOIN (
        SELECT 
          product_id,
          JSON_ARRAYAGG(
            image_url
          ) as images
        FROM product_images
        GROUP BY product_id
      ) pi ON p.id = pi.product_id
      WHERE p.user_id IN (
        SELECT id
        FROM products
        WHERE id = ?
      )
      `,
    [productId]
  );
};

const getStoreReivew = async (productId) => {
  return await appDataSource.query(
    `
      SELECT
        r.user_id userId,
        r.contents,
        r.rating
      FROM reviews r
      WHERE r.product_id = ?
    `,
    [productId]
  );
};

const getStoreProductList = async (storeId) => {
  console.log(storeId);
  return await appDataSource.query(
    `
      SELECT DISTINCT
      p.id productId,
      p.name productName,
      p.price productPrice,
      p.created_at registerDate,
      p.location location,
      p.latitude lat,
      p.longitude lng,
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
      INNER JOIN categories ON categories.id = p.category_id
      INNER JOIN orders ON orders.product_id != p.id
      WHERE p.user_id = ?
      `,
    [storeId]
  );
};

module.exports = {
  getProductList,
  getproductDetail,
  getStoreReivew,
  getStoreInfor,
  getStoreProductList,
};
