"use strict";

const express = require("express");
const bodyParser = require("body-parser");
const userRoute = require("./routes/userRoutes");
const cors = require("cors");
const { logger } = require("./utils/logger");
const app = express();

app.use(bodyParser.json());

app.use(cors());
app.use("/api", userRoute);

const PORT = 3000;
app.listen(PORT, () => {
    logger.info(`Server is running on port ${PORT}`);
    console.log(`Server is running on port ${PORT}`);
});
