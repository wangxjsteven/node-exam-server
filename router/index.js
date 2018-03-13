let express=require('express'),
    router = express.Router(),
    regist=require('./user/regist'),
    login=require('./user/login'),
    logout=require('./user/logout');

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
router.post('/regist', regist);
// 登入
router.post('/login', login);
// 登出
router.post('/logout', logout);

module.exports = router;