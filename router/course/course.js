let { Course } = require('../../model/user.js')

let course = function(req, res, next) {
    Course.find((err, course) => {
        console.log(course)
        if (err) {
            res.send(PayloadException('BUSINESS_ERROR', '获取题库失败，原因：' + err))
        } else {
            res.send(PayloadSuccess(course))
        }
    })

};

module.exports = course