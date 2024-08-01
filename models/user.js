// src/users/userModel.js

'use strict';

let Sequelize = require('sequelize');
let sequelize = require('../config/databaseConn');

// table [extension]
let User = sequelize.define(
  'users',
  {
    name: Sequelize.STRING,
    email: Sequelize.STRING,
    phone: Sequelize.STRING
  },
  {
    tableName: 'users',
    timestamps: false
  }
);
let Customers = sequelize.define(
  'customers',
  {
    name: Sequelize.STRING,
    email: Sequelize.STRING,
    phone: Sequelize.STRING,
    age: Sequelize.INTEGER,
    address: Sequelize.STRING
  },
  {
    tableName: 'customers',
    timestamps: false
  }
);
sequelize
  .sync({ force: false }) // force: false ensures it doesn't drop existing tables
  .then(() => {
    console.log('Database & tables created!');
  })
  .catch((err) => {
    console.error('Error creating database tables:', err);
  });
module.exports = {
  Customers,
  User
};
