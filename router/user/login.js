let { User } = require('../../model/user.js')
const uuidv1 = require('uuid/v1'),
    crypto = require('crypto')
/**
 * @author: kelly
 * @date: 2018.3.13 10:30
 * @path /user/login':
 * @description: 登录
 */
let login = function(req, res, next) {
    let { password, username } = req.body,
        session = uuidv1(),
        reg = new RegExp(username)

    if (!username) {
        return res.send(PayloadException('PARAMETER_ERROR', '用户名不能为空'))
    } else if (!password) {
        return res.send(PayloadException('PARAMETER_ERROR', '密码不能为空'))
    }
    //加密username
    let hash = crypto.createHash('md5')
    hash.update(password)
    const realpass = hash.digest('hex')

    User.find({ username: reg }, (err, list) => {
        if (err) {
            return res.send(PayloadException('BUSINESS_ERROR', '查找用户失败，原因：' + err))
        } else if (list.length === 0) {
            return res.send(PayloadException('PARAMETER_ERROR', '该用户不存在'))
        }
        if (list[0].password !== realpass) {
            return res.send(PayloadException('PARAMETER_ERROR', '密码不正确'))
        }
        RedisClient.multi()
            .select(0)
            .set(`session:${session}`, username)
            .expire(`session:${session}`, global.expires)
            .exec((err, result) => {
                if (result[0] !== 'OK') {
                    return res.send(PayloadException('NETWORK_EXCEPTION', 'redis服务器异常'))
                }
                if (result[1] !== 'OK' || result[2] !== 1) {
                    return res.send(PayloadException('NETWORK_EXCEPTION', 'redis设置失败'))
                }
                res.cookie('session', session, {
                    path: '/',
                    httpOnly: true
                });
                res.send(PayloadSuccess({username}))
            });
    })
};

module.exports = login