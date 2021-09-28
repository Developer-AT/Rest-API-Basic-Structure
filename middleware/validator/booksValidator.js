const resService = require('./../../service/ResponseService');

const BooksValidator = {

    checkForUndefinedData: function(data){
        if(typeof data.book_name == 'undefined' || typeof data.author == 'undefined' || typeof data.published_year == 'undefined'){
            return {response: false, msg:'Parameter Not Found'};
        }
        return {response: true, msg:'Success'};
    },

    checkForEmptyData: function(data){
        if(data.book_name == ''){
            return {response: false, msg:'Book Name is Missing'};
        }
        if(data.author == ''){
            return {response: false, msg:'Author Name is Missing'};
        }
        if(data.published_year == ''){
            return {response: false, msg:'Published Year is Missing'};
        }
        return {response: true, msg:'Success'};
    },

    validateIncomingData: function(req,res,next){
        if(!this.checkForUndefinedData(req.body).response){
            resService.errResponse(res, this.checkForUndefinedData(req.body).msg);
            return false;
        }

        if(!this.checkForEmptyData(req.body).response){
            resService.errResponse(res, this.checkForEmptyData(req.body).msg);
            return false;
        }

        return next();
    },

    validateIncomingDataBeforeUpdate: function (data,res,next) {
        if(typeof data.book_name == 'undefined' && typeof data.author == 'undefined' && typeof data.published_year == 'undefined'){
            resService.errResponse(res, 'Parameter Not Found');
            return false
        }
        if(data.book_name == '' && data.author == '' && data.published_year == ''){
            resService.errResponse(res, 'Nothing To update');
            return false
        }

        return next();
    }
}

module.exports = BooksValidator;