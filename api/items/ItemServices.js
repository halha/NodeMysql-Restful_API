const db = require("../../config/db");

if (db) {
    console.log("DB connected");
} else {
    console.log("Fail to connect the DB");
}

module.exports = {
    add: (data, callback) => {
        var data_item = {
            owner: data.owner,
            item_name: data.item_name,
            item_amount: data.item_amount,
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
    get: (data, callback) => {
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
    update: (data, callback) => {
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
