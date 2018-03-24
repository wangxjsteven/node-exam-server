//url的前缀
global.Prefix = '';


//初始化接口处理全局变量
const {PayloadException, PayloadSuccess} = require('../utils/payload');

global.PayloadException = PayloadException;
global.PayloadSuccess = PayloadSuccess;
global.delEmptyProp=(obj)=> {
    let _obj = {}
    for (let key in obj) {
        obj[key] && (_obj[key] = obj[key])
    }
    return _obj
}