const { appDataSource } = require('./dataSource');

const getUserBysocialId = async (socialId) => {
  const result = await appDataSource.query(
    `
    SELECT
      id
    FROM users
    WHERE social_id = ?
    `,
    [socialId]
  );
  return result;
};

const insertSocialId = async (socialId, name) => {
  console.log(name);
  await appDataSource.query(
    `
    INSERT INTO users (
      social_id,
      name
    ) VALUES (?,?);
    `,
    [socialId, name]
  );
};

const insertUserData = async (
  userId,
  nickname,
  address,
  latitude,
  longitude
) => {
  await appDataSource.query(
    `
    UPDATE users
    SET
      nickname =?,
      address =?,
      latitude=?,
      longitude= ?
    WHERE id = ?
    `,
    [nickname, address, latitude, longitude, userId]
  );
};

const getUserById = async (userId) => {
  const result = await appDataSource.query(
    `
    SELECT
        id,
        nickname
    FROM users
    WHERE id = ?
    `,
    [userId]
  );
  return result;
};

module.exports = {
  getUserBysocialId,
  insertUserData,
  insertSocialId,
  getUserById,
};
