const express = require("express");
const { Hashtag, User, Post, Comment, Image } = require("../models");
const { Op } = require("sequelize");
const router = express.Router();

router.get("/:hashtag", async (req, res, next) => {
  // GET /hashtag/1
  try {
    const where = {};
    const lastId = parseInt(req.query.lastId, 10);
    if (lastId) {
      where.id = { [Op.lt]: lastId }; //보다 작은을 표현하는 시퀄라이저
    }

    const posts = await Post.findAll({
      where,
      limit: 10, // 10개만 가져온다.
      order: [
        ["createdAt", "DESC"],
        [Comment, "createdAt", "DESC"],
      ],
      include: [
        {
          model: Hashtag,
          where: { name: decodeURIComponent(req.params.hashtag) },
        },
        { model: User, attributes: ["id", "nickname"] },
        { model: Image },
        {
          model: Comment,
          include: [
            {
              model: User,
              attributes: ["id", "nickname"],
            },
          ],
        },
        {
          model: User, //좋아요 누른 사람
          as: "Likers",
          attributes: ["id"],
        },
        {
          model: Post,
          as: "Retweet",
          include: [
            {
              model: User,
              attributes: ["id", "nickname"],
            },
            { model: Image },
          ],
        },
      ],
    });
    res.status(200).json(posts);
  } catch (error) {
    console.error(error);
    next(error);
  }
});

module.exports = router;
