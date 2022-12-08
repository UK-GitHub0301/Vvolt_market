const express = require('express');
const likeRouter= express.Router();
const { likeController } = require('../controllers');
const { checkAuth } = require('../utils/checkAuth');


likeRouter.post('', likeController.createLikeByUsername);
likeRouter.get('/:userId', likeController.getLikeByusername);
likeRouter.post("/:productId", checkAuth, likeController.deleteLike);

module.exports = {likeRouter};