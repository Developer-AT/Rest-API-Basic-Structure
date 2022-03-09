const redis = require('redis');

const redis_conn = redis.createClient({
    host: '127.0.0.1',
    port: '6379',
    retry_strategy: function(options){
        if(options.error && options.error.code === 'ECONNREFUSED'){
            return new Error("The Server refused to connection");
            console.log('The Server refused to connection');
        }
        if(options.attempt > 10){
            return undefined;
        }
        return 1000*3;
    }
});

redis_conn.on("error", (err) => {
    console.log(err);
});

module.exports = redis_conn;