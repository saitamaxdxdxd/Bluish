const jwt = require("jsonwebtoken");
const pool = require("../config/database");
const { jwtKey } = require("../config/env");

const authCtrl = {
    protect: async function (req, res, next) {
        let token

        if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
            try {
                // Get token from header
                [, token] = req.headers.authorization.split(" ");
                const decode = jwt.verify(token, jwtKey);

                // Get user from token
                const sqlCmd = `SELECT * from minds WHERE id='${decode.id}'`;
                [req.user] = (await pool.query(sqlCmd)).rows;
                next();
            }
            catch (error) {
                res.status(401).json({ error: "Not authorized", message: error.meesage });
            }
        }

        if (!token) {
            res.status(401).json({ error: "Not authorized, no token", message: error.meesage });
        }
    }
}

module.exports = authCtrl;