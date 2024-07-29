// src/users/userModel.js

"use strict";

let Sequelize = require("sequelize");
let sequelize = require("../config/databaseConn");

// table [extension]
let User = sequelize.define(
    "users",
    {
        name: Sequelize.STRING,
        email: Sequelize.STRING,
        phone: Sequelize.STRING,
    },
    {
        tableName: "users",
        timestamps: false,
    },
);

module.exports = {
    User,
};
