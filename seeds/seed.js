const sequelize = require('../config/connection');
const { User, Post, Comment } = require('../models');

const userData = require('./userData.js');
const postData = require('./postData.js');
const commentData = require('./commentData.js');

const seedDatabase = async () => {
  await sequelize.sync({ force: false });

  const users = await User.bulkCreate(userData, {
    individualHooks: true,
    returning: true,
  });

  for (const post of postData) {
    await Post.create({
      ...post,
      user_id: users[Math.floor(Math.random() * users.length)].id,
    });
  }

  process.exit(0);
};

seedDatabase();
