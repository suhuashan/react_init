const { SuccessModel, ErrorModel } = require('../../util/response');
const model = require('../../db/model');
const User = model.user;

const login = async (ctx) => {

    let { username, password } =  ctx.request.body;

    let userRes = await User.findAll({where: {username}});
    if (!userRes.length) {
        ctx.body = new ErrorModel('该账号不存在，请先注册');
        return;
    } 

    let res = await User.findAll({
            where: {
                username,
                password
            }
        });
    if (res.length) {
        ctx.session.userID = username;
        ctx.body = new SuccessModel('登陆成功');
    } else {
        ctx.body = new ErrorModel('密码或账号错误，请重试');
    }
}

const logout = async (ctx) => {
    ctx.session = null;
    ctx.body = new SuccessModel('退出成功');
}

module.exports = {
    'POST /blog/login': login,
    'GET /blog/logout': logout
}