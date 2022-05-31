const MindClass = require("../utils/TableSettings");

const mindObject = new MindClass("minds");

const mindCtrl = {
    getAllMinds: async function (req, res) {
        const [status, response] = await mindObject.getAllQueries();
        res.status(status).json(response);
    },

    createMind: async function (req, res) {
        const [status, response] = await mindObject.createRow(req.body);
        res.status(status).json(response);
    },

    getMind: async function (req, res) {
        const [status, response] = await mindObject.getSingleQuery(req.params.id);
        res.status(status).json(response);
    },

    updateMind: async function (req, res) {
        const [status, response] = await mindObject.updateRow(req.params.id, req.body);
        res.status(status).json(response);
    },

    deleteMind: async function (req, res) {
        const [status, response] = await mindObject.deleteRow(req.params.id);
        res.status(status).json(response);
    },

    loginMind: async function (req, res) {
        try {
            const { email, password } = req.body;

            // Check email existence
            const pool = require("../config/database");
            const { compare } = require("bcrypt");
            const sqlCmd = `SELECT * FROM minds WHERE email='${email}'`;
            const [mind] = (await pool.query(sqlCmd)).rows;
            if (mind && await compare(password, mind.password)) {
                res.status(200).json({
                    data: {
                        id: mind.id,
                        email: mind.email,
                        username: mind.username,
                        token: mindObject.generateToken(mind.id)
                    }
                });
            }
            else throw new Error("Invalid user data");
        }
        catch (error) {
            res.status(400).json({ status: "Error", error: error.message });
        }

    },

    myMind: function (req, res) {
        res.json({ status: "Success", data: req.user });
    }
}

module.exports = mindCtrl;