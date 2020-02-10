const {
    createUser,
    getUserById,
    getUsers,
    updateUsers,
    deleteUser,
    login,
    addItems,
    addItemAmount,
    reduceStorage
} = require("./UserController");
const users = require("express").Router();
const { checkToken } = require("../../auth/TokenValidation");

users.post("/", checkToken, createUser);

users.get("/", checkToken, getUsers);

users.get("/:id", checkToken, getUserById);

users.patch("/", checkToken, updateUsers);

users.delete("/:id", checkToken, deleteUser);

users.post("/login", login);

users.post("/item/addnew", checkToken, addItems);

users.post("/item/addamount", checkToken, addItemAmount);

users.post("/item/reduceamount", checkToken, reduceStorage);

module.exports = users;
