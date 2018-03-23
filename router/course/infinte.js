let { Infinte } = require('../../model/user.js')

let infintes = function(req, res, next) {
    Infinte.find((err, infintes) => {
        console.log(infintes)
        if (err) {
            res.send(PayloadException('BUSINESS_ERROR', '获取题库失败，原因：' + err))
        } else {
            res.send(PayloadSuccess(infintes))
        }
    })

};

module.exports = infintes