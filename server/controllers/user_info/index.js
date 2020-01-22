const { SuccessModel, ErrorModel } = require('../../util/response');
const model = require('../../db/model');
const User = model.user;

const getUserInfo = async (ctx) => {

    let { username } =  ctx.request.query,
        res = await User.findOne({
            where: {
                username
            },
            attributes: [
                'username', 'desc', 'signature', 'avatar', 'tags', 'createdAt'
            ]
        });
        
    if (res) {
        ctx.body = new SuccessModel(res);
    } else {
        ctx.body = new ErrorModel('该账号不存在');
    }
}

module.exports = {
    'GET /blog/user_info': getUserInfo
}