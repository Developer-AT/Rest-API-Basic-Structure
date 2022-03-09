const express = require('express');
const BooksController = require('./../../controller/books');
const BooksValidator = require('./../../middleware/validator/booksValidator');

const bookRoutes = express.Router();

bookRoutes.get('/all',
    (req,res) => BooksController.fetchAllBooks(res)
)

bookRoutes.post('/add',function(req,res,next){
    BooksValidator.validateIncomingData(req,res,next)
}, function(req,res){
    BooksController.validateAndInsertBook(req.body, res);
});

bookRoutes.put('/update/:bookId(\\d+)',function(req,res,next){
    BooksValidator.validateIncomingDataBeforeUpdate(req.body,res,next);
}, function(req,res){
    BooksController.updateBookById(req.params.bookId,req.body, res);
})

bookRoutes.delete('/delete/:bookId(\\d+)', function(req,res){
    BooksController.deleteBookById(req.params.bookId, res);
})

bookRoutes.get('/count/author', function(req,res){
    BooksController.fetchBookCountByAuthor(res);
})

bookRoutes.get('/count/publishedYear', function(req, res){
    BooksController.fetchBookCountByPublishedYear(res);
})

module.exports = bookRoutes;