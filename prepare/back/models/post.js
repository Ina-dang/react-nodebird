module.exports = (sequelize, DataTypes) => {
  const Post = sequelize.define(
    'Post',
    {
      content: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      //RetweetId
    },
    {
      charset: 'utf8mb4', // 한글사용 + 이모티콘
      collate: 'utf8mb4_general_ci', // 한글 저장
    }
  );

  Post.associate = (db) => {
    //add ,remove, set 자주사용 get 은 보통
    db.Post.belongsTo(db.User); //post.addUser, post.getUser
    db.Post.belongsToMany(db.Hashtag, { through: 'PostHashtag' }); // post.addHashtags
    db.Post.hasMany(db.Comment); //post.addComments, post.getComments
    db.Post.hasMany(db.Image); //post.addImages, post.getImages
    db.Post.belongsToMany(db.User, { through: 'Like', as: 'Likers' }); //post.addLikers, post.removeLikers
    db.Post.belongsTo(db.Post, { as: 'Retweet' }); //post.addRetweet
  };

  return Post;
};
