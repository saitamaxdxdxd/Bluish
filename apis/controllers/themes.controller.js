const ThemeClass = require("../utils/TableSettings");

const themeObject = new ThemeClass("themes");

const themeCtrl = {
    getAllThemes: async function (req, res) {
        const [status, response] = await themeObject.getAllQueries();
        res.status(status).json(response);
    },

    createTheme: async function (req, res) {
        const [status, response] = await themeObject.createRow(req.body);
        res.status(status).json(response);
    },

    getTheme: async function (req, res) {
        const [status, response] = await themeObject.getSingleQuery(req.params.id);
        res.status(status).json(response);
    },

    updateTheme: async function (req, res) {
        const [status, response] = await themeObject.updateRow(req.params.id, req.body);
        res.status(status).json(response);
    },

    deleteTheme: async function (req, res) {
        const [status, response] = await themeObject.deleteRow(req.params.id);
        res.status(status).json(response);
    },

    getAllThemesByTheme: async function (req, res) {
        try {
            const pool = require("../config/database");
            const { idTheme } = req.params;
            const sqlCmd = `SELECT * FROM themes WHERE idTheme='${idTheme}'`;
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

module.exports = themeCtrl;