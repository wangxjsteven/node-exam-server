const uuidv1 = require('uuid/v1'),
    svgCaptcha = require('svg-captcha');

/**
 * @author: kelly
 * @date: 2017年10月31日 上午10:20
 * @swagger
 * /system/code:
 *   get:
 *     description: "获取图片验证码"
 *     tags:
 *     - "system"
 *     produces:
 *     - "image/svg+xml"
 */
module.exports = function(req, res, next) {
    let session = uuidv1(),
        captcha = svgCaptcha.create({
            size: 4,
            noise: 2,
            color: true,
            background: '#ffffff',
            width: 100,
            height: 40,
            ignoreChars: 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'
        });

    RedisClient.multi()
        .select(0) // 选择db0
        .set(`vcode:${session}`, captcha.text) // key: vcode${code_session} value: captcha.text, key type: string
        .expire(`vcode:${session}`, global.vcodeExpires) // 设置过期时间，使用默认全局配置的vcodeExpires时间
        .execAsync()
        .then(replies => {
            if (replies[0] === 'OK' && replies[1] === 'OK' && replies[2] === 1) {
                res.cookie('code_session', session, {
                    path: '/',
                    httpOnly: true
                });
                res.type('svg');
                res.status(200).send(captcha.data);
            } else {
                res.status(500).send('BUSINESS_ERROR','图形验证码插入redis发生错误');
            }
        })
        .catch(err => next(err))
};
