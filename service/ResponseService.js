const res = {
    successResponse: function(res, data){
        res.json(data);
    },

    errResponse: function(res, msg, status=200){
        res.status(status).json({error: msg});
    }
}

module.exports = res;