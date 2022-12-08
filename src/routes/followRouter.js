const express = require('express');
const followRouter= express.Router();
const { followController } = require('../controllers');
const { checkAuth } = require('../utils/checkAuth');


followRouter.post('',checkAuth, followController.createFollowByUsername);
followRouter.get('/:userId', followController.getFollowByUsername);
followRouter.post("/:followeeId", checkAuth, followController.postFollow);


module.exports = { followRouter };