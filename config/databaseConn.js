// config/databaseConn.js

let Sequelize = require("sequelize");

let sequelize = new Sequelize("test1", "root", "1234", {
    host: "localhost",
    dialect: "mysql",
});

module.exports = sequelize;
