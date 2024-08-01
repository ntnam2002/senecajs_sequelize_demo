// config/databaseConn.js

let Sequelize = require("sequelize");
const { logger } = require("../utils/logger");

let sequelize = new Sequelize("test1", "root", "1234", {
    host: "localhost",
    dialect: "mysql",
    logging: (msg) => logger.info(msg),
});

module.exports = sequelize;
