const { SuccessModel, ErrorModel } = require('../../util/response');
const model = require('../../db/model');
const User = model.user;

const reg = async (ctx) => {

    let { username, password } =  ctx.request.body,
        res = await User.findAll({
            where: {
                username
            }
        });
    if (res.length) {
        ctx.body = new ErrorModel('该账号已经存在');
    } else {
        try {
            let res = await User.create({username, password});
            ctx.session.username = username;
            ctx.session.userID = res.dataValues.id;
            ctx.body = new SuccessModel('注册成功');
        } catch (err) {
            ctx.body = new ErrorModel('注册失败');
        }
    }
}

module.exports = {
    'POST /blog/reg': reg
}