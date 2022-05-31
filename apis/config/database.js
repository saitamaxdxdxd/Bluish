const { Pool } = require("pg");

const { dbHost, dbPort, dbUser, dbPassword, dbDatabase } = require("./env");

const client = new Pool({
    host: dbHost,
    port: dbPort,
    user: dbUser,
    password: dbPassword,
    database: dbDatabase
});

client
    .connect()
    .then(() => console.log("Database connected"))
    .catch(error => console.error(error));

module.exports = client;