const { Sequelize } = require('sequelize');

const sequelize = new Sequelize({
    dialect: 'mysql2',
    host: 'localhost',
    port: 3306,
    username: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_NAME || 'tech_blog_db',
});

module.exports = sequelize;
