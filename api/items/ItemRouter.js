const { addItem, getItems, updateItems } = require("./ItemController");
const items = require("express").Router();
const { checkToken } = require("../../auth/TokenValidation");

items.post("/", addItem);

items.get("/", getItems);

items.patch("/", updateItems);

export default items;
