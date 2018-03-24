let { Collection } = require('../../model/user.js')

let record = function(req, res, next) {
    let { id, originAns, username, note } = req.body || {}

    let colResult = {
        "id": id,
        "username": username,
        "problemAns": originAns,
        "problemNote": note
    }
    Collection.create(colResult, (err, doc) => {
        console.log(doc);
        if (err) {
            res.send(PayloadException('BUSINESS_ERROR', '获取题库失败，原因：' + err))
        } else {
            res.send(PayloadSuccess(colResult))
        }
    })

};

module.exports = record