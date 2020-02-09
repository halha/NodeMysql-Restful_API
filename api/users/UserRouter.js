const {
    createUser,
    getUserById,
    getUsers,
    updateUsers,
    deleteUser,
    login,
    addItems,
    addItemAmount
} = require("./UserController");
const users = require("express").Router();
const { checkToken } = require("../../auth/TokenValidation");

users.post("/", checkToken, createUser);

users.get("/", checkToken, getUsers);

users.get("/:id", checkToken, getUserById);

users.patch("/", checkToken, updateUsers);

users.delete("/:id", checkToken, deleteUser);

users.post("/login", login);

users.post("/additem", checkToken, addItems);

users.post("/additem/amount", checkToken, addItemAmount);

module.exports = users;
