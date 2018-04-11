let { User } = require('../../model/user.js')
const crypto = require('crypto'),
    hash = crypto.createHash('md5')

/**
 * @author: kelly
 * @date: 2018.3.13 10:30
 * @path /user/regist':
 * @description: 登出
 */
let regist = async function(req, res, next) {
    let { username, password, phone, email, validate } = req.body || {},
        reg = new RegExp(username), { code_session } = req.cookies
    hash.update(password)
    let vcode = await RedisClient.multi()
        .select(0)
        .get(`vcode:${code_session}`)
        .execAsync();

    if (vcode[0] !== 'OK') {
        return res.send(PayloadException('NETWORK_EXCEPTION', '选择redis[0]失败'))
    }

    if (!vcode[1]) {
        return res.send(PayloadException('BUSINESS_ERROR', '图形验证码已过期，请重新获取'))
    } else if (vcode[1] !== validate) {
        return res.send(PayloadException('BUSINESS_ERROR', '图形验证码错误，请重新输入' ));
    } else {
        RedisClient.multi()
            .select(0)
            .del(`vcode:${code_session}`)
            .execAsync()
        User.find({ username: reg }, (err, list) => {
            if (err) {
                return res.send(PayloadException('BUSINESS_ERROR', '获取admin失败，原因：' + err))
            }
            if (!list || list.length === 0) {
                let user1 = new User({
                    username: username,
                    password: hash.digest('hex'),
                    email: email || '',
                    phone: phone || ''
                })
                user1.save(function(err, doc) {
                    err&&console.error(err);
                })
                res.send(PayloadSuccess())
            } else {
                res.send(PayloadException('BUSINESS_ERROR', '用户名重复，无法重复注册！'))
            }
        })
    }
};

module.exports = regist