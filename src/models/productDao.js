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
    SELECT p.user_id
    FROM products p
    WHERE p.id = ?
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

const createProduct = async (name, description, price, location, latitude, longitude, product_status_id, category_id, user_id, image_url) => {
    const product = await appDataSource.query(
        `    
        INSERT INTO products (
          name,
          description,
          price,
          location,
          latitude,
          longitude,
          product_status_id,
          category_id,
          user_id
        ) VALUES (
          ?,
          ?,
          ?,
          ?,
          ?,
          ?,
          ?,
          ?,
          ?
        );
        `,
        [name, description, price, location, latitude, longitude, product_status_id, category_id, user_id]
    );
    
    const imageBulk = image_url.map((image_url) => {
      return `(${product.insertId}, "${image_url}")`;
    })
    const values = imageBulk.join(", "); 
    
    const productImages = await appDataSource.query(
        `INSERT INTO product_images (
            product_id, 
            image_url
        ) VALUES ${values}`
    );
}

const productUpdate = async (setClause, imageBulks, productId) => {
    const product = await appDataSource.query(
        `
        UPDATE products
        ${setClause}
        WHERE id = ?;
        `,
        [productId]
    );
    
    const productImageDelete = await appDataSource.query(
        `
        DELETE FROM product_images
        WHERE product_id = ?
        `,
        [productId]
    );

    const productImageAdd = await appDataSource.query(
        `
        INSERT INTO product_images ( 
            product_id, 
            image_url 
        ) VALUES ${imageBulks}
        `
    );
    return productImageAdd;
};


const getProductId = async (productId) => {
  try {
    const [checkId] = await appDataSource.query(
      `
        SELECT
        products.id
        FROM products
        WHERE products.id = ?
      `,
      [productId]
    );
    return checkId;
  } catch (err) {
    const error = new Error('INVALID_DATA_INPUT');
    error.statusCode = 500;
    throw error;
  }
};

module.exports = {
  getProductList,
  getproductDetail,
  getStoreReivew,
  getStoreInfor,
  getStoreProductList,
  createProduct, 
  productUpdate,
  getProductId
};
