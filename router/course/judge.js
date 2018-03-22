let { Judge } = require('../../model/user.js')

let judges = function(req, res, next) {
    Judge.find((err, judges) => {
        console.log(judges)
        if (err) {
            res.send(PayloadException('BUSINESS_ERROR', '获取题库失败，原因：' + err))
        } else {
            res.send(PayloadSuccess(judges))
        }
    })

};

module.exports = judges