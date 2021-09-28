const db = require('./../db_connection');

const dbConn = db.dbConn;
const dataType = db.DataTypes;

const booksFieldTypeCheck = {
    id: {
        type: dataType.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    book_name: {
        type: dataType.STRING,
        validate: {
            notEmpty: false,
        }
    },
    published_year: {
        type: dataType.STRING,
        validate: {
            notEmpty: true
        }
    },
    author: {
        type: dataType.STRING,
        validate: {
            notEmpty: true,
        }
    }
}

module.exports = dbConn.define('books',booksFieldTypeCheck,{
    createdAt: false,
    updatedAt: false
});