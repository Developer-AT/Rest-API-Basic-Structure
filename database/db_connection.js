const Sequelize = require('sequelize');
const db = {};
const dbConn = new Sequelize('book_management', 'root', '',{
    host: 'localhost',
    dialect: 'mysql',
    pool: {
        max: 5,
        min: 0,
        ideal: 1000,
        acquire: 30000
    }
})

dbConn.authenticate().then(() => {
    console.log('Connection successfull');
}).catch((err) => {
    console.log('Unable to connect : ', err);
});
db.dbConn = dbConn;
db.DataTypes = Sequelize.DataTypes;
db.QueryTypes = Sequelize.QueryTypes;
module.exports = db;