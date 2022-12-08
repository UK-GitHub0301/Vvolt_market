const { appDataSource } = require("./dataSource")

const createFolloweeByUsername = async (follower, followee) => {
	
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

const getFolloweeByUsername = async (userId) => {

	const user = await appDataSource.query(`
	select 
	u.nickname as usernickname,
	u.id,
	u.user_image,
	f.follower as user_following
	from users u
	LEFT JOIN follow f ON u.id = f.follower
	WHERE f.followee =?`, [userId]
	)
	console.log(userId)
	return user
}




module.exports = {
    getFolloweeByUsername,
    createFolloweeByUsername
}

