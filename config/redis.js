let fs = require('fs'),
    { decipher } = require('../utils/aesCrypto'),
    env = process.env.NODE_ENV || "dev";

let redisConfig = {
    dev: {
        host: '127.0.0.1',
        // password: 'kelly308',
        port: '6379',
        db: 0,
    },
    test: {
        filePath: '/opt/node-console/redis-config.properties',
        getRedisConfig: getRedisConfig
    },
    prod: {
        filePath: '/opt/node-console/redis-config.properties',
        key: '4f6NvzBnV23dUUt3',
        getRedisConfig: getRedisConfig
    }
};

/*
 * 测试/生产环境从服务器配置文件里读取redis host、password以及配置参数
 * 生产环境： host、password已通过ase加密算法进行加密
 * 测试环境： host、password不加密
 * */
function getRedisConfig(path, key) {
    try {
        let fileContent = fs.readFileSync(path, 'utf8');
        let arr1 = fileContent.split('\n'),
            obj = {};

        for (let i in arr1) {
            arr1[i] = arr1[i].replace(/#.*/g, "").replace(/\s/g, ""); // 去掉空格符
            if (arr1[i] !== '') { // 去掉空字符串
                let arr2 = arr1[i].split('=');
                obj[arr2[0]] = arr2[1]
            } else {
                continue;
            }
        }
        return {
            host: key ? decipher(key, obj.REDIS_HOST) : obj.REDIS_HOST, // 解密
            port: obj.REDIS_PORT,
            password: key ? decipher(key, obj.REDIS_PASSWORD) : obj.REDIS_PASSWORD, // 解密
            db: obj.REDISDB_DB
        };

    } catch (err) {
        return err;
    }
}

module.exports = redisConfig[env];