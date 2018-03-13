//url的前缀
global.Prefix = '';


//初始化接口处理全局变量
const {payloadException, payloadSuccess} = require('../utils/payload');

global.PayloadException = payloadException;
global.PayloadSuccess = payloadSuccess;