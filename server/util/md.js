/**
 * @description: 生成加密密码
 */
const crypto = require('crypto');

exports.createPwd = function (mingma) {
    let md5 = crypto.createHash('md5');
    let password = md5.update(mingma).digest("base64");
    return password;
}

exports.createHash = function () {
    let randomNum = `${Date.now()}` + `${Math.random()}`;
    let md5 = crypto.createHash('md5');
    
    return md5.update(randomNum).digest("hex");
}