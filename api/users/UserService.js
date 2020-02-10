const db = require("../../config/db");

if (db) {
    console.log("DB connected");
} else {
    console.log("Fail to connect the DB");
}

module.exports = {
    create: (data, callback) => {
        var register_data = {
            first_name: data.first_name,
            last_name: data.last_name,
            class: data.class,
            email: data.email,
            password: data.password
        };

        db.query(
            `INSERT INTO register SET ?`,
            register_data,
            (err, results, fields) => {
                if (err) return callback(err);
                return callback(null, results);
            }
        );
    },
    getUsers: callback => {
        db.query(
            `SELECT id_account, first_name, last_name, class, email FROM register`,
            [],
            (err, results, fields) => {
                if (err) return callback(err);
                return callback(null, results);
            }
        );
    },
    getUserById: (id_account, callback) => {
        db.query(
            `SELECT id_account, first_name, last_name, class, email FROM register WHERE id_account = ${id_account}`,
            (err, results, fields) => {
                if (err) return callback(err);
                return callback(null, results[0]);
            }
        );
    },
    updateUser: (data, callback) => {
        db.query(
            `UPDATE register SET first_name=?, last_name=?, class=?, email=?, password=? WHERE id_account = ?`,
            [
                data.first_name,
                data.last_name,
                data.class,
                data.email,
                data.password,
                data.id_account
            ],
            (err, results, fields) => {
                if (err) return callback(err);
                if (!results) {
                    return results.json({
                        success: 0,
                        message: "Failed to update user"
                    });
                }
                return callback(null, results);
            }
        );
    },
    deleteUser: (id_account, callback) => {
        db.query(
            `DELETE FROM register WHERE id_account = ?`,
            [id_account],
            (err, results, fields) => {
                if (err) return callback(err);
                return callback(null, results[0]);
            }
        );
    },
    getUserByEmail: (email, callback) => {
        db.query(
            `SELECT * FROM register WHERE email = ?`,
            [email],
            (err, results, fields) => {
                if (err) return callback(err);
                return callback(null, results[0]);
            }
        );
    },
    addItem: (data, callback) => {
        var data_item = {
            owner: data.owner,
            item_name: data.item_name,
            price: data.price
        };

        db.query(
            `INSERT INTO items SET ?`,
            data_item,
            (err, results, fields) => {
                if (err) return callback(err);
                return callback(null, results);
            }
        );
    },
    addItemAmount: (data, callback) => {
        var data_amount = {
            item_name: data.item_name,
            item_amount: data.item_amount
        };

        db.query(
            `INSERT INTO storage (item_name, item_count) SELECT item_name, ${data_amount.item_amount} FROM items WHERE item_name = "${data_amount.item_name}"`,
            (err, results, fields) => {
                if (err) return callback(err);
                return callback(null, results);
            }
        );
    },
    reduceStorage: (data, callback) => {
        var data_reduce = {
            item_name: data.item_name,
            item_amount: data.item_amount
        };

        db.query(
            `SELECT id_storage, item_name, item_count FROM storage WHERE item_name = "${data_reduce.item_name}"`,
            (err, results, fields) => {
                if (results[0].item_count < data_reduce.item_amount) {
                    return callback("Terlalu banyak, gagal mengambil");
                }

                var amount_now =
                    results[0].item_count - data_reduce.item_amount;

                var new_data = {
                    item_name: results[0].item_name,
                    item_amount: amount_now
                };

                db.query(
                    `UPDATE storage SET item_count = ? WHERE item_name = "${new_data.item_name}"`,
                    [new_data.item_amount],
                    (err, results, fields) => {
                        if (err) return callback(err);
                        return callback(null, results);
                    }
                );
            }
        );
    }
};
