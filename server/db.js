const Pool = require("pg").Pool;

const pool = new Pool({
    user: "anthonymcdonald",
    password: "postgresqlovely",
    host: "localhost",
    port: 5432,
    database: "recomeats"
})

module.exports = pool;