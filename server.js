const express = require("express");
const bodyParser = require("body-parser");
const userRoute = require("./routes/userRoutes");
const cors = require("cors");
const app = express();
app.use(bodyParser.json());

app.use(cors());
app.use("/api", userRoute);

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
