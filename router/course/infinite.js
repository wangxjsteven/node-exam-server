let { Question } = require('../../model/user.js')

let papers = function(req, res, next) {
    let { paperId, subjectId } = req.query

    Question.find(delEmptyProp({ subjectId: subjectId }), (err, questions) => {
        // console.log(questions)
        if (err) {
            res.send(PayloadException('BUSINESS_ERROR', '获取题库失败，原因：' + err))
        } else {
            let list = [],
                count = 0;
            for (let item of questions) {
                let { id } = item
                list.push({ "ProblemId": id, "ProblemOrder": ++count })
            }
            res.send(PayloadSuccess({
                "id": subjectId,
                "paperId": paperId,
                "ProblemNum": count,
                "Problems": list
            }))
        }
    })
};

module.exports = papers