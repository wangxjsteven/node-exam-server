let { Collection, Question } = require('../../model/user.js')
/**
 * @author: kelly
 * @date: 2018.3.13 10:30
 * @path /user/regist':
 * @description: 登出
 */
let collection = function(req, res, next) {
    let { username, subjectId } = req.query

    Collection.find(delEmptyProp({ username, subjectId:Number(subjectId) }), (err, collections) => {
        let _colls = [],
            ids = [],
            result = {
                username,
                subjectId,
                problems: []
            }
        for(let c of collections){
            let {id,problemAns,problemNote}=c
            _colls.push({id,problemAns,problemNote})
        }
        if (err) {
            res.send(PayloadException('BUSINESS_ERROR', '获取题库失败，原因：' + err))
        } else {
            if (_colls.length > 0) {
                for (let elem of _colls) {
                    ids.push(elem.id)
                }
                Question.where('id').in(ids).exec((err, questions) => {
                    for (let q of questions) {
                        let currCol=_colls.find((c)=>{return c.id===q.id})
                        result.problems.push({
                            id: q.id,
                            problemAns: currCol.problemAns,
                            problemNote:currCol.problemNote,
                            questionname:q.questionname,
                            option:q.option,
                            username: username
                        })
                    }
                    res.send(PayloadSuccess(result))

                })
            }

            // result.problems = _colls
            // res.send(PayloadSuccess(result))
        }
    })

};

module.exports = collection