let {User} = require('../../model/user.js')

/**
 * @author: kelly
 * @date: 2018.3.13 10:30
 * @path /user/regist':
 * @description: 登出
 */
let regist = function(req, res, next) {
    
    // console.log('user:', User)
    // console.log(req)
    if (!User.find({ username: /admin/ })) {

        let user1 = new User({ username: 'admin', password: 123456 })
        user1.save(function(err, doc) {
            console.log(doc);
        })
        return res.send(PayloadSuccess())
    }else{
        return res.send(PayloadException('BUSINESS_ERROR','已有同名账户，无法重复注册，请知悉！'))
    }
};

module.exports = regist