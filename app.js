require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const userRouter = require("./api/users/UserRouter");
const itemRouter = require("./api/items/ItemRouter");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use("/api/users", userRouter);

app.use("/api/items", itemRouter);

app.listen(process.env.APP_PORT, () => {
    console.log(`Server running on port ${process.env.APP_PORT}`);
});
