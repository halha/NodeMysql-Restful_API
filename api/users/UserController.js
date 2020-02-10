const {
    create,
    getUserById,
    getUsers,
    updateUser,
    deleteUser,
    getUserByEmail,
    addItem,
    addItemAmount,
    reduceStorage
} = require("./UserService");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { verify } = require("jsonwebtoken");

module.exports = {
    createUser: (req, res) => {
        const body = req.body;
        const salt = bcrypt.genSaltSync(10);
        body.password = bcrypt.hashSync(`${body.password}`, salt);
        create(body, (err, results) => {
            if (err) {
                console.log(err);
                return res.status(500).json({
                    success: 0,
                    message: "Database connection error!"
                });
            }
            return res.status(200).json({
                success: 1,
                data: results
            });
        });
    },
    getUserById: (req, res) => {
        const id_account = req.params.id;
        getUserById(id_account, (err, results) => {
            if (err) return console.log(err);
            if (!results) {
                return res.json({
                    success: 0,
                    message: "Record not found"
                });
            }
            return res.json({
                success: 1,
                data: results
            });
        });
    },
    getUsers: (req, res) => {
        getUsers((err, results) => {
            if (err) return console.log(err);
            return res.json({
                success: 1,
                data: results
            });
        });
    },
    updateUsers: (req, res) => {
        const body = req.body;
        const salt = bcrypt.genSaltSync(10);
        body.password = bcrypt.hashSync(`${body.password}`, salt);
        updateUser(body, (err, results) => {
            if (err) return console.log(err);
            return res.json({
                success: 1,
                message: "Updated successfully!"
            });
        });
    },
    deleteUser: (req, res) => {
        const id_account = req.params.id;
        deleteUser(id_account, (err, results) => {
            if (err) return console.log(err);
            if (results) {
                return res.json({
                    success: 0,
                    message: "Record not found!"
                });
            }
            return res.json({
                success: 1,
                message: "User deleted successfully!"
            });
        });
    },
    login: (req, res) => {
        const body = req.body;
        getUserByEmail(body.email, (err, results) => {
            if (err) return console.log(err);
            if (!results) {
                return res.json({
                    success: 0,
                    message: "Invalid email or password"
                });
            }
            const result = bcrypt.compareSync(
                `${body.password}`,
                `${results.password}`
            );
            if (result) {
                results.password = undefined;
                const jsonToken = jwt.sign(
                    { result: results },
                    process.env.JWT_KEY,
                    {
                        expiresIn: "1h"
                    }
                );
                return res.json({
                    success: 1,
                    message: "Login successfully!",
                    token: jsonToken
                });
            } else {
                return res.json({
                    success: 0,
                    message: "Invalid email or password bawah"
                });
            }
        });
    },
    addItems: (req, res) => {
        const body = req.body;
        let token = req.get("authorization");

        if (token) {
            token = token.slice(7);

            verify(token, process.env.JWT_KEY, (err, decoded) => {
                if (err || decoded.result == undefined) {
                    res.json({
                        success: 0,
                        message: "Invalid token!"
                    });
                } else {
                    var data_decoded = decoded.result;
                    var data_item = {
                        owner: data_decoded.first_name,
                        item_name: body.item_name,
                        price: body.price
                    };

                    addItem(data_item, (err, results) => {
                        if (err) {
                            console.log(err);
                            return res.status(500).json({
                                success: 0,
                                message: "Database connection error!"
                            });
                        }
                        return res.status(200).json({
                            success: 1,
                            message: "Item added successfully",
                            data: results
                        });
                    });
                }
            });
        }
    },
    addItemAmount: (req, res) => {
        const body = req.body;
        addItemAmount(body, (err, results) => {
            if (err) {
                return res.status(500).json({
                    success: 0,
                    message: "Database connection error!"
                });
            }
            return res.status(200).json({
                success: 1,
                data: results
            });
        });
    },
    reduceStorage: (req, res) => {
        const body = req.body;
        reduceStorage(body, (err, results) => {
            if (err) {
                console.log(err);
                return res.status(500).json({
                    success: 0,
                    message: "Database connection error!",
                    problem: err
                });
            }
            return res.status(200).json({
                success: 1,
                data: results
            });
        });
    }
};
