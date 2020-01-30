const path = require('path');
const uploadeHandler = require('./handle.js');
const model = require('../../db/model');
const User = model.user;


async function upload (ctx, next) {
    if (ctx.url === '/blog/upload' && ctx.method === 'POST' ) {
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

        await User.update({
            avatar: result.filePath
        },{
            where: {
                username: ctx.session.userID
            }
        });
        
        delete result.filePath;

        ctx.body = result
        return;
    }

    await next();
}

module.exports = upload;