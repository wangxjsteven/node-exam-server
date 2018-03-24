let { Subject } = require('../../model/user.js')

let subjects = function(req, res, next) {
    Subject.find((err, subjects) => {
        // console.log(subjects)
        if (err) {
            res.send(PayloadException('BUSINESS_ERROR', '获取题库失败，原因：' + err))
        } else {
            res.send(PayloadSuccess(subjects))
        }
    })

};

module.exports = subjects