let { Paper } = require('../../model/user.js')

let papers = function(req, res, next) {
    Paper.find((err, _papers) => {
        console.log(_papers)
        if (err) {
            res.send(PayloadException('BUSINESS_ERROR', '获取题库失败，原因：' + err))
        } else {
            res.send(PayloadSuccess(_papers))
        }
    })

};

module.exports = papers