const { verify } = require("jsonwebtoken");

// TODO: fix tokenValidation error
module.exports = {
    checkToken: (req, res, next) => {
        let token = req.get("authorization");
        if (token) {
            token = token.slice(7);
            verify(token, process.env.JWT_KEY, (err, decoded) => {
                if (err) {
                    res.json({
                        success: 0,
                        message: "Invalid token!"
                    });
                } else {
                    next(decoded.result);
                }
            });
        } else {
            res.json({
                success: 0,
                message: "Access denied! Unauthorized user"
            });
        }
    }
};
