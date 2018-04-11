/*
* 返回数据的真实类型,包括"boolean","number","string","function","object","array","date","error","symbol","regexp","undefined","null"
*/
function type(param) {
    let str = Object.prototype.toString.call(param),
        reg = /\[object (\w+)\]/;
    return reg.exec(str)[1].toLowerCase();
}

module.exports = type;
