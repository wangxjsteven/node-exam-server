let { Question, Judge } = require('../../model/user.js')

let judges = function(req, res, next) {
    let { username, problems } = req.body || {},
        ids = getIds(problems)

    Question.where('id').in(ids).exec((err, questions) => {
        // console.log(questions)
        let result = [],
            judgeResult = [],
            count = 0
        for (let i = 0; i < questions.length; ++i) {
            let q = questions[i],
                obj = {
                    "id": q.id,
                    "correctAns": q.answer,
                    "result": q.answer === problems[i].originAns ? '1' : '0',
                    "originAns": problems[i].originAns
                }
            count += obj.result
            result.push(obj)
            obj.username = username || ''
            judgeResult.push(obj)
        }
        // let judge1 = new Judge(result)
        Judge.create(judgeResult, (err, doc) => {
            console.log(doc);
            if (err) {
                res.send(PayloadException('BUSINESS_ERROR', '获取题库失败，原因：' + err))
            } else {
                res.send(PayloadSuccess({ evaluate: getEvaluate(count / questions.length), problems: result }))
            }
        })
    })

};

function getIds(problems) {
    let ids = []
    for (let p of problems) {
        ids.push(p.id)
    }
    return ids
}

function getEvaluate(rate) {
    if (rate >= 1) {
        return 'god like！'
    } else if (rate >= 0.9) {
        return '多智近乎妖也！'
    } else if (rate >= 0.8) {
        return '好棒棒！'
    } else if (rate >= 0.6) {
        return '不错，再接再厉！'
    }
    return 'stupid!'
}

module.exports = judges