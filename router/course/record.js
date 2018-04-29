let { Collection,Question } = require('../../model/user.js')

let record = function(req, res, next) {
    let { type, id, subjectId, originAns, username, note } = req.body || {}

    let colResult = {
        "id": id,
        "subjectId": subjectId,
        "username": username,
        "problemAns": originAns,
        "problemNote": note
    }
    if (!id) {
        return res.send(PayloadException('PARAMETER_ERROR', 'id不能为空'))
    }

    Collection.find({ id: id }, (err, data) => {
        if (data && data.length > 0) {
            if (type === 'del') {
                Collection.remove({ id }, (err, doc) => {
                    if (err) {
                        res.send(PayloadException('BUSINESS_ERROR', '获取题库失败，原因：' + err))
                    } else {
                        res.send(PayloadSuccess())
                    }
                })
            } else {
                res.send(PayloadException('PARAMETER_ERROR', '已收藏该题目'))
            }
        } else {
            if (type === 'del') {
                res.send(PayloadException('PARAMETER_ERROR', '收藏列表中无此题目'))
            } else {
                Question.findOne({ id }, (err, q) => {
                    let coll = {
                        id: colResult.id,
                        subjectId: q.subjectId,
                        problemAns: colResult.problemAns,
                        problemNote: colResult.problemNote,
                        questionname: q.questionname,
                        option: q.option,
                        username: username
                    }

                    Collection.create(coll, (err, doc) => {
                        if (err) {
                            res.send(PayloadException('BUSINESS_ERROR', '获取题库失败，原因：' + err))
                        } else {
                            res.send(PayloadSuccess(colResult))
                        }
                    })
                })
            }
        }
    })

};

module.exports = record