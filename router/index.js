let express = require('express'),
    router = express.Router(),
    register = require('./user/register'),
    code=require('./user/code'),
    login = require('./user/login'),
    logout = require('./user/logout'),
    questions = require('./course/questions'),
    collection = require('./course/collection'),
    judge = require('./course/judge'),
    record = require('./course/record'),
    paper = require('./course/paper'),
    result = require('./course/result'),
    subject = require('./course/subject'),
    course = require('./course/course'),
    infinite = require('./course/infinite')

// 该路由使用的中间件
router.use(async function (req, res, next) {
    const {session} = req.cookies;

    res.set({
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept',
        'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE'
    })

    // let vcode = await RedisClient.multi()
    //     .select(0)
    //     .get('session')
    //     .execAsync();
    // if(req.url.indexOf('/api/')===-1){
    //     if(vcode[0]!=='OK'){
    //         return res.send(PayloadException('NETWORK_EXCEPTION', 'redis服务器异常'))
    //     }else if(!vcode[1]||vcode[1]!==session){
    //         return res.send(PayloadException(1003, '未登录'))
    //     }
    // }
    next();
});

router.get('/', function(req, res) {
    const query = req.query;
    res.send('Hello ' + query.name);
});

// 注册
router.all('/api/register', register);
// 验证码
router.all('/api/code', code);
// 登入
router.all('/api/login', login);
// 登出
router.all('/api/logout', logout);
//问题
router.get('/questions', questions);
//收藏
router.get('/collection', collection);
//判断对错
router.post('/judge', judge);
//添加收藏
router.post('/record', record);
//试卷
router.get('/paper', paper);
//结果
router.get('/result', result);
//考试科目
router.get('/subject', subject);
//试卷封面列表
router.get('/course', course);
//随机模式
router.get('/infinite', infinite);
module.exports = router;