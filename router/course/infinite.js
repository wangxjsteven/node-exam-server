let { Infinite } = require('../../model/user.js')

let infinites = function(req, res, next) {
    Infinite.find((err, infinites) => {
        console.log(infinites)
        if (err) {
            res.send(PayloadException('BUSINESS_ERROR', '获取题库失败，原因：' + err))
        } else {
            res.send(PayloadSuccess(infinites))
        }
    })

};

module.exports = infinites