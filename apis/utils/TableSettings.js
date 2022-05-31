const { genSalt, hash } = require("bcrypt");

const pool = require("../config/database");

class TableSettings {
    constructor(tableName) {
        this.tableName = tableName;
    }

    async getAllQueries() {
        try {
            const sqlCmd = `SELECT * FROM ${this.tableName}`;
            console.log(sqlCmd)
            const data = await pool.query(sqlCmd);
            return [200, {
                status: "Success",
                length: data.rowCount,
                data: data.rows
            }];
        }
        catch (error) {
            return [400, { status: "Error", error }];
        }
    }

    async getSingleQuery(id) {
        try {
            const sqlCmd = `SELECT * FROM ${this.tableName} WHERE id = '${id}'`;
            const data = await pool.query(sqlCmd);
            if (data.rows.length === 0) throw Error("The id does not exist");
            return [200, { status: "Success", data: data.rows[0] }];
        }
        catch (error) {
            return [404, { status: "Error", message: error.message }];
        }
    }

    async createRow(object) {
        try {
            if (object.password) {
                const salt = await genSalt(12);
                const secretPassword = await hash(object.password, salt);
                object.password = secretPassword;
            }

            object.birth = Date.now().toString();
            console.log(object)
            const values = []
            let listOfValues = "";
            const columnNames = [];
            for (const [key, value] of Object.entries(object)) {
                columnNames.push(key);
                values.push(value);
            }
            for (let i = 0; i < values.length; i++) {
                if (i === values.length - 1) listOfValues += `$${i + 1}`;
                else listOfValues += `$${i + 1}, `;
            }

            const sqlCmd = `INSERT INTO ${this.tableName} 
                (${columnNames.join(", ")})
                VALUES (${listOfValues}) RETURNING *`;
            const [data] = (await pool.query(sqlCmd, values)).rows;

            if (this.tableName === "minds") {
                const sqlCmdToken = `UPDATE minds SET token='${this.generateToken(data.id)}' 
                    WHERE id='${data.id}'`;
                await pool.query(sqlCmdToken);
            }

            const sqlCmdFinal = `SELECT * FROM ${this.tableName} WHERE id='${data.id}'`
            const [finalData] = (await pool.query(sqlCmdFinal)).rows

            return [201, { status: "Success", data: finalData }];
        }
        catch (error) {
            return [400, { status: "Error", error: error.message }];
        }
    }

    async updateRow(id, object) {
        try {
            if (object.password) {
                const salt = await genSalt(12);
                const secretPassword = await (object.password, salt);
                object.password = secretPassword;
            }

            let listOfValues = "";
            let values = []
            let counter = 1;
            for (const [key, value] of Object.entries(object)) {
                listOfValues += `${key}=$${counter}, `;
                values.push(value)
                counter += 1;
            }
            listOfValues = listOfValues.slice(0, -2);

            const sqlCmdCheck = `SELECT * FROM ${this.tableName} WHERE id='${id}'`;
            const dataCheck = await pool.query(sqlCmdCheck);
            if (dataCheck.rows.length === 0) throw Error("The id does not exist");

            const sqlCmd = `UPDATE ${this.tableName} SET ${listOfValues} WHERE id='${id}'`;
            console.log(sqlCmd);
            const data = await pool.query(sqlCmd, values);
            return [201, { status: "Success", data }];
        }
        catch (error) {
            return [404, { status: "Error", message: error.message }];
        }
    }

    async deleteRow(id) {
        try {
            const sqlCmdCheck = `SELECT * FROM ${this.tableName} WHERE id = '${id}'`;
            const data = await pool.query(sqlCmdCheck);
            if (data.rows.length === 0) throw Error("The id does not exist");
            const sqlCmd = `DELETE FROM ${this.tableName} WHERE id = '${id}'`;
            await pool.query(sqlCmd);
            return [204, { status: "Success" }];
        }
        catch (error) {
            return [404, { status: "Error", message: error.message }];
        }
    }

    generateToken(id) {
        const jwt = require("jsonwebtoken");
        const { jwtKey } = require("../config/env");
        return jwt.sign({ id }, jwtKey, { expiresIn: "1d" });
    }
}

module.exports = TableSettings;