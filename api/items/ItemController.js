module.exports = {
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
