const {
    createUser,
    getUserById,
    getUsers,
    updateUsers,
    deleteUser,
    login
} = require("./UserController");
const users = require("express").Router();
const { checkToken } = require("../../auth/TokenValidation");

// TODO: fix tokenValidation error
users.post("/", checkToken, createUser);

users.get("/", checkToken, getUsers);

users.get("/:id", checkToken, getUserById);

users.patch("/", checkToken, updateUsers);

users.delete("/:id", checkToken, deleteUser);

users.post("/login", login);

module.exports = users;
