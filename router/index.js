let express=require('express'),
    router = express.Router(),
    regist=require('./user/regist'),
    login=require('./user/login'),
    logout=require('./user/logout');
    questions=require('./course/questions')
    collection=require('./course/collection')

// 该路由使用的中间件
router.use(function timeLog(req, res, next) {
  console.log('user Time: ', Date.now());
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
router.get('/questions',questions);
//收藏
router.get('/collection',collection);

module.exports = router;