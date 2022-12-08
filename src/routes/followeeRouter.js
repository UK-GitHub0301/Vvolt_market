const express = require('express');
const followeeRouter= express.Router();
const { followeeController } = require('../controllers');



followeeRouter.post('', followeeController.createFolloweeByUsername);
followeeRouter.get('/:userId', followeeController.getFolloweeByUsername);

module.exports = {followeeRouter};