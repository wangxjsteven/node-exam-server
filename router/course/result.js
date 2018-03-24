let { Result } = require('../../model/user.js')

let results = function(req, res, next) {
    Result.find((err, results) => {
        // console.log(results)
        if (err) {
            res.send(PayloadException('BUSINESS_ERROR', '获取题库失败，原因：' + err))
        } else {
            res.send(PayloadSuccess(results))
        }
    })

};

module.exports = results