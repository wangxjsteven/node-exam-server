let { User } = require('../../model/user.js')

/**
 * @author: kelly
 * @date: 2018.3.13 10:30
 * @path /user/regist':
 * @description: 登出
 */
let regist = function(req, res, next) {
    let { username, password,phone } = req.query || {},
        reg = new RegExp(username)
    console.log(username,reg)
    User.find({ username: reg }, (err, list) => {
        if (err) {
            return res.send(PayloadException('BUSINESS_ERROR', '获取admin失败，原因：' + err))
        }
        if (!list || list.length === 0) {
            let user1 = new User({
                username: username,
                password: password,
                phone:phone||''
            })
            user1.save(function(err, doc) {
                console.log(doc);
            })
            res.send(PayloadSuccess())
        } else {
            res.send(PayloadException('BUSINESS_ERROR', '已有同名账户，无法重复注册，请知悉！'))
        }
    })
};

module.exports = regist