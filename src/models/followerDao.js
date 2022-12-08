const { appDataSource } = require("./dataSource")

const createFollowByUsername = async (follower, followee) => {
	
	const createFollower = await appDataSource.query(
    `INSERT INTO Follow (
        follower,
        followee
    ) VALUES (? ,?);
    `,
    [follower, followee]
    ); 
	return createFollower;

};

const getFollowByUsername = async (userId) => {

	const user = await appDataSource.query(`
	select
	u.nickname as usernickname,
	u.id,
  u.user_image,
	f.follower as user_following
	from users u
	LEFT JOIN follow f ON u.id=f.followee
	WHERE f.follower= ?
  `, [userId]
	)
	return user
}

const getFollow = async (userId, followeeId) => {
  const [followData] = await appDataSource.query(
    `SELECT EXISTS(
        SELECT *
        FROM follow f
        WHERE f.follower = ? AND f.followee = ?
        ) AS existence
        `,
    [userId, followeeId]
  );
  return followData;
};

const createFollow = async (userId, followeeId) => {
  await appDataSource.query(
    `
      INSERT INTO follow(
        follower,
        followee)
      VALUES(?,?);
      `,
    [userId, followeeId]
  );
};

const deleteFollow = async (userId, followeeId) => {
  await appDataSource.query(
    `
      DELETE
      FROM follow f
      WHERE f.follower = ? and f.followee = ?
      `,
    [userId, followeeId]
  );
};

module.exports = {
    getFollowByUsername,
    createFollowByUsername,
	  deleteFollow,
    getFollow, 
    createFollow
}

