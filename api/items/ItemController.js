const { add, get, update } = require("./ItemServices");
const { checkToken } = require("../../auth/TokenValidation");

module.exports = {
    addItem: (req, res) => {
        const body = req.body;

        checkToken(req, res, results => {
            var data_item = {
                owner: results.first_name,
                item_name: body.item_name,
                item_amount: body.item_amount,
                price: body.price
            };

            add(data_item, (err, results) => {
                if (err) {
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
        });
    },
    getItems: (req, res) => {
        const body = req.body;
        get(body, (err, results) => {
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
    updateItems: (req, res) => {
        const body = req.body;
        update(body, (err, results) => {
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
