const AlterEgoClass = require("../utils/TableSettings");

const alterEgoObject = new AlterEgoClass("alteregos");

const alterEgosCtrl = {
    getAllAlterEgos: async function (req, res) {
        const [status, response] = await alterEgoObject.getAllQueries();
        res.status(status).json(response)
    },

    createNewAlterEgo: async function (req, res) {
        const [status, response] = await alterEgoObject.createRow(req.body);
        res.status(status).json(response);
    },

    getAlterEgo: async function (req, res) {
        const [status, response] = await alterEgoObject.getSingleQuery(req.params.id);
        res.status(status).json(response);
    },

    updateAlterEgo: async function (req, res) {
        const [status, response] = await alterEgoObject.updateRow(req.params.id, req.body);
        res.status(status).json(response);
    },

    deleteAlterEgo: async function (req, res) {
        const [status, response] = await alterEgoObject.deleteRow(req.params.id);
        res.status(status).json(response);
    },

    getAllAlterEgosByMind: async function (req, res) {
        try {
            const pool = require("../config/database");
            const { idMind } = req.params;
            const sqlCmd = `SELECT * FROM alteregos WHERE mind='${idMind}'`;
            console.log(sqlCmd)
            const data = await pool.query(sqlCmd);
            if (data.rows.length === 0) throw Error("The id does not exist");
            res.status(200).json({ status: "Success", length: data.rowCount, data: data.rows });
        }
        catch (error) {
            res.status(404).json({ status: "Error", message: error.message });
        }
    }
}

module.exports = alterEgosCtrl;