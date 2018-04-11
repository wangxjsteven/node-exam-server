let crypto = require('crypto');

/*
* 加密
* 使用ase加密算法
* */
exports.cipher = function (key, clearText) {
    const cipher = crypto.createCipher('aes192', key);
    let encrypted = cipher.update(clearText, 'utf8', 'hex');
    encrypted += cipher.final('hex');
    return encrypted
};

/*
* 解密
* 使用ase解密算法
* */
exports.decipher = function (key, encrypted) {
    const decipher = crypto.createDecipher('aes192', key);
    let decrypted = decipher.update(encrypted, 'hex', 'utf8');
    decrypted += decipher.final('utf8');
    return decrypted
};