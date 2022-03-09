const redis = require('../redis/redis_connection');
const { promisify } = require('util')

class RedisService{
    constructor(redis) {
        this.redis = redis;
        this.redisGet = promisify(this.redis.get).bind(this.redis);
        this.redisSet = promisify(this.redis.set).bind(this.redis);
    }

    async fetchByKey(key){
        try{
            return await this.redisGet(key);
        }
        catch (err){
            console.log('err :: ',err);
            return false;
        }
    }

    async setByKey(key, value){
        try{
            return await this.redisSet(key,value);
        }
        catch (err){
            console.log('err :: ',err);
            return false;
        }
    }
}

module.exports = new RedisService(redis);