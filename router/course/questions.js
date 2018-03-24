let { Question } = require('../../model/user.js')
// console.log('ddd',Question)
/**
 * @author: kelly
 * @date: 2018.3.13 10:30
 * @path /user/regist':
 * @description: 登出
 */
let questions = function(req, res, next) {
    let { ids } = req.query
    // ids=ids?ids.split(','):[]
    Question
        .where('id').in(ids)
        .exec((err, questions) => {
            let result = []
            // console.log(questions)
            for (let q of questions) {
                let { id, paperId, subjectId, questionname, option } = q
                result.push({ id, paperId, subjectId, questionname, option })
            }
            if (err) {
                res.send(PayloadException('BUSINESS_ERROR', '获取题库失败，原因：' + err))
            } else {
                res.send(PayloadSuccess(result))
            }
        })

};

module.exports = questions