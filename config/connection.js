const knex = require('knex');

const db = knex({
    client: 'mysql',
    connection: {
        host: 'your_database_host',
        user: 'your_database_user',
        password: 'your_database_password',
        database: 'your_database_name'
    }
});

module.exports = db;
