const { User } = require('../models');

const userData =
[
  {
    "username": "leonis",
    "email": "leonhsu95@gmail.com",
    "password": "admin12345"
  },
  {
    "username": "saladtini",
    "email": "lernantino@hotmail.com",
    "password": "password12345"
  },
  {
    "username": "zaconium",
    "email": "zli0@gmail.com",
    "password": "zacPW1234"
  }
]

const seedUsers = () => User.bulkCreate(userData);

module.exports = seedUsers;