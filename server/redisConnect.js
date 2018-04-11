let redis = require('redis'),
    redisConfig = require('../config/redis'),
    type = require('../utils/type'),
    bluebird = require('bluebird'),
    env = process.env.NODE_ENV || "dev";

bluebird.promisifyAll(redis.RedisClient.prototype);
bluebird.promisifyAll(redis.Multi.prototype);

let redisClient;

if (env === 'dev') {
    redisClient = redisConnect(redisConfig);
} else {
    let {filePath, key, getRedisConfig} = redisConfig;

    let config = getRedisConfig(filePath, key);

    if (type(config) === 'error') {
        console.error('读取redis配置文件发生错误', config);
    } else {
        redisClient = redisConnect(config)
    }
}

function redisConnect(config) {
    console.log('开始连接redis....',config);
    let client = redis.createClient({
        host: config.host,
        port: config.port,
        // password: config.password,
        db: config.db,
        // 当服务端异常断开会导致重连接，而若是客户端主动断开则不会重连接
        retry_strategy: function (options) {
            if (options.attempt <= 10) {
                console.log('1s后重新连接redis');
                return 1000; // 1秒后重连
            } else {
                console.log('60s后重新连接redis');
                return 1000 * 60; // 60秒后重连
            }
        }
    });

    // 监听redis connect事件
    client.on("connect", function () {
        console.log("redis连接成功");
    });

    // 监听redis connect事件
    client.on("end", function () {
        console.error("redis断开连接");
    });

    // 监听redis error事件
    client.on("error", function (err) {
        console.error("redis发生错误，Error：" + err);
    });

    return client;
}

module.exports = redisClient;

