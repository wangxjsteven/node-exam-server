/**
 其中有几个比较重要的异常code,参考ConsoleExceptionHandler.java
 'REQ_METHOD_ERROR':"请求方式异常"
 'NOACCESS': "鉴权失败"
 'PARAMETER_ERROR': "请求参数有误"
 'NETWORK_EXCEPTION': "网络异常"
 'BUSINESS_ERROR': "服务异常"
 */
let payloadException = function (code, message) {
    let resO = {
        code: code || 9999, // 默认 BUSINESS_ERROR
        message: '',
        data: {}
    };
    // 如果message为null、undefined、""
    if (!message) {
        message = ""
    }

    switch (code) {
        case 'REQ_METHOD_ERROR':
            resO.message = message || "请求方式异常";
            break;
        case 'NOACCESS':
            resO.message = message || "鉴权失败";
            break;
        case 'PARAMETER_ERROR':
            resO.message = message || "请求参数有误";
            break;
        case 'NETWORK_EXCEPTION':
            resO.message = typeof message === 'string' ? message : message.message || "网络错误";
            break;
        case 'BUSINESS_ERROR':
            resO.message = typeof message === 'string' ? message : message.message || "服务异常";
            break;
        default:
            resO.message = typeof message === 'string' ? message : message.message || '';
            break;
    }
    return resO
};

let payloadSuccess = function (data = {}) {
    return {
        code: 0,
        message: "操作成功",
        data: data
    }
};

module.exports = {
    payloadException: payloadException,
    payloadSuccess: payloadSuccess
};
