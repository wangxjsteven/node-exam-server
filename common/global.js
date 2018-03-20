//url的前缀
global.Prefix = '';


//初始化接口处理全局变量
const {PayloadException, PayloadSuccess} = require('../utils/payload');

global.PayloadException = PayloadException;
global.PayloadSuccess = PayloadSuccess;