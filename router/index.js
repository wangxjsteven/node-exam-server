let express = require('express'),
    router = express.Router(),
    regist = require('./user/regist'),
    login = require('./user/login'),
    logout = require('./user/logout');
questions = require('./course/questions')
collection = require('./course/collection')
judge = require('./course/judge')
paper = require('./course/paper')
result = require('./course/result')
subject = require('./course/subject')
infinte=require('./course/infinte')

// 该路由使用的中间件
router.use(function timeLog(req, res, next) {
    console.log('user Time: ', Date.now());
    res.set({
        'Access-Control-Allow-Origin': '*'
    })
    next();
});

router.get('/', function(req, res) {
    const query = req.query;
    res.send('Hello ' + query.name);
});

// 注册
router.get('/regist', regist);
// 登入
router.get('/login', login);
// 登出
router.get('/logout', logout);
//问题
router.get('/questions', questions);
//收藏
router.get('/collection', collection);
//判断对错
router.get('/judge', judge);
//试卷
router.get('/paper', paper);
//结果
router.get('/result', result);
//考试科目
router.get('/subject', subject);
//随机模式
router.get('/infinte',infinte);
module.exports = router;