const Sequelize = require('sequelize');

const sequelize = new Sequelize({
    dialect: 'mysql2',
    host: 'localhost', 
    port: 3306, 
    username: 'root', 
    password: 'Dogsarecool1!', 
    database: 'tech_blog_db', 
    define: {
        underscored: true, // Use underscored naming conventions for columns
        freezeTableName: true, // Prevent Sequelize from pluralizing table names
    }
});

module.exports = sequelize;
