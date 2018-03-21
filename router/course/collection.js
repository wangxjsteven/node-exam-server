let { Collection } = require('../../model/user.js')
// console.log('ddd',Question)
/**
 * @author: kelly
 * @date: 2018.3.13 10:30
 * @path /user/regist':
 * @description: 登出
 */
let collection = function(req, res, next) {
    Collection.find((err, collection) => {
        console.log(collection)
        if (err) {
            res.send(PayloadException('BUSINESS_ERROR', '获取题库失败，原因：' + err))
        } else {
            res.send(PayloadSuccess(collection))
        }
    })

};

module.exports = collection