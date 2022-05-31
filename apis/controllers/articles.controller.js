const ArticleClass = require("../utils/TableSettings");

const ThemeObject = new ArticleClass("articles");

const themeCtrl = {
    getAllArticles: async function (req, res) {
        const [status, response] = await ThemeObject.getAllQueries();
        res.status(status).json(response);
    },

    createArticle: async function (req, res) {
        const [status, response] = await ThemeObject.createRow(req.body);
        res.status(status).json(response);
    },

    getArticle: async function (req, res) {
        const [status, response] = await ThemeObject.getSingleQuery(req.params.id);
        res.status(status).json(response);
    },

    updateArticle: async function (req, res) {
        const [status, response] = await ThemeObject.updateRow(req.params.id, req.body);
        res.status(status).json(response);
    },

    deleteArticle: async function (req, res) {
        const [status, response] = await ThemeObject.deleteRow(req.params.id);
        res.status(status).json(response);
    },

    getAllArticlesByTheme: async function (req, res) {
        try {
            const pool = require("../config/database");
            const { idTheme } = req.params;
            const sqlCmd = `SELECT * FROM articles WHERE theme='${idTheme}'`;
            console.log(sqlCmd)
            const data = await pool.query(sqlCmd);
            if (data.rows.length === 0) throw Error("The id does not exist");
            res.status(200).json({ status: "Success", length: data.rowCount, data: data.rows });
        }
        catch (error) {
            res.status(404).json({ status: "Error", message: error.message });
        }
    },

    getAllArticlesByAuthor: async function (req, res) {
        try {
            const pool = require("../config/database");
            const { idAuthor } = req.params;
            const sqlCmd = `SELECT * FROM articles WHERE author='${idAuthor}'`;
            console.log(sqlCmd)
            const data = await pool.query(sqlCmd);
            if (data.rows.length === 0) throw Error("The id does not exist");
            res.status(200).json({ status: "Success", length: data.rowCount, data: data.rows });
        }
        catch (error) {
            res.status(404).json({ status: "Error", message: error.message });
        }
    },    
}

module.exports = themeCtrl;