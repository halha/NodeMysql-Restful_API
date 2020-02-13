const { addItem, getItems, updateItems } = require("./ItemController");
const items = require("express").Router();
const { checkToken } = require("../../auth/TokenValidation");

items.post("/", addItem);

items.get("/", checkToken, getItems);

items.patch("/", checkToken, updateItems);

module.exports = items;
