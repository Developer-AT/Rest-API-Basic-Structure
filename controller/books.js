const resService = require('./../service/ResponseService');
const booksModel = require('./../database/models/Books');
const db = require('./../database/db_connection');
const redisService = require('../service/RedisService');

const dbConn = db.dbConn;
const QueryTypes = db.QueryTypes;

const BooksController = {

    validateAndInsertBook: function(data, res){
        // Find book in db to prevent duplicate Entry
        booksModel.findOne({
            attributes: ['id'],
            where: {
                book_name: data.book_name
            }
        }).then(book => {
            if(book){
                resService.errResponse(res, 'Duplicate Book Name');
            }else{
                // Insert data in db;
                this.insertBook(data,res);
            }
        }).catch(err => resService.errResponse(res, 'Something Went Wrong'))
    },

    insertBook: function(data, res){
        booksModel.create(data).then(
            inserteddata => resService.successResponse(res, inserteddata)
        ).catch(
            err => resService.errResponse(res, 'Something Went Wrong')
        );
    },

    fetchAllBooks: async function(res){
        let booksDataFromRedis = await redisService.fetchByKey('all');
        if(booksDataFromRedis){
            resService.successResponse(res, {books: JSON.parse(booksDataFromRedis)});
        }else{
            booksModel.findAll({
                attributes: ['id','book_name','author','published_year']
            }).then(
                books => {
                    redisService.setByKey('all',JSON.stringify(books));
                    resService.successResponse(res, {books: books});
                }
            ).catch(
                err => resService.errResponse(res, 'Something Went Wrong')
            )
        }
    },

    deleteBookById: function(bookId, res){
        booksModel.destroy({
            where: {
                id: bookId
            }
        }).then(
            (book) => {
                // If Book Delete get 1 else get 0
                if(book){
                    resService.successResponse(res, {success: 'Data Deleted Successfully'});
                }
                else{
                    resService.errResponse(res, 'Unable to find Book, Invalid Book Id');
                }
            }
        ).catch(
            err => resService.errResponse(res, 'Something Went Wrong! Unable to Delete')
        );
    },

    updateBookById: function (bookId, param, res) {
        let structuredParam = this.structureDataBeforeUpdate(param);
        booksModel.update(structuredParam,{
            where: {
                id: bookId
            }
        }).then(
            (book) => {
                // If Book Updated get 1 else get 0 (Note: if updated data same as previous it return 0)
                if(book[0]){
                    resService.successResponse(res, {success: 'Book Updated Successfully'});
                }
                else{
                    resService.errResponse(res, 'Unable to find Book, Invalid Book Id');
                }
            }
        ).catch(
            err => resService.errResponse(res, 'Something Went Wrong! Unable to Update')
        );
    },

    structureDataBeforeUpdate: function(param){
        if(typeof param.book_name != 'undefined' && param.book_name == ''){
            delete(param.book_name);
        }
        if(typeof param.author != 'undefined' && param.author == ''){
            delete(param.author);
        }
        if(typeof param.published_year != 'undefined' && param.published_year == ''){
            delete(param.published_year);
        }
        return param;
    },

    fetchBookCountByAuthor: function(res){
        dbConn.query('SELECT author , COUNT(id) as books_count FROM `books` GROUP BY author',{
            type: QueryTypes.SELECT
        }).then(
            (books) => {
                resService.successResponse(res, {books: books})
            }
        ).catch(
            err => resService.errResponse(res, 'Something Went Wrong')
        );
    },

    fetchBookCountByPublishedYear: function(res){
        dbConn.query('SELECT published_year , COUNT(id) as books_count FROM `books` GROUP BY published_year',{
            type: QueryTypes.SELECT
        }).then(
            (books) => {
                resService.successResponse(res, {books: books})
            }
        ).catch(
            err => resService.errResponse(res, 'Something Went Wrong')
        );
    }
}

module.exports = BooksController;