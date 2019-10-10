const Knex = require("knex"),
    { Model } = require("objection"),
    config = require("../config/database");

const knex = Knex({
    client: "mysql2",
    useNullAsDefault: true,
    connection: {
        host: config.host,
        port: config.port,
        user: config.user,
        password: config.password,
        database: config.database
    }
});

Model.knex(knex);
module.exports = knex;
