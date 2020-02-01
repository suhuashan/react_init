const path = require('path');
const uploadeHandler = require('./handle.js');
const model = require('../../db/model');
const User = model.user;


async function upload (ctx, next) {
    let uploadType = ctx.request.query.type;

    if (ctx.url.indexOf('/blog/upload') >= 0 && ctx.method === 'POST' ) {
        // 上传文件请求处理
        let result = { 
            code: -1,
            message: '上传文件失败'
        };
        let serverFilePath = path.join( __dirname, '../../static/upload' );

        // 上传文件事件
        result = await uploadeHandler( ctx, {
            path: serverFilePath
        })
        
        //用户头像上传需要修改数据库
        if (uploadType === 'avatar') {
            await User.update({
                avatar: result.filePath
            },{
                where: {
                    username: ctx.session.username
                }
            });
        }

        result.code = 0;

        ctx.body = result
        return;
    }

    await next();
}

module.exports = upload;