const { SuccessModel, ErrorModel } = require('../../util/response');
const { article: Article, user: User } = require('../../db/model');

const savePublishBlog = async(ctx) => {
    let {
        blogType,
        blogTitle,
        blogAbstract,
        blogContent,
        blogTags,
        blogCategories,
        blogStatus
    } = ctx.request.body;

    try {
        await Article.create({
            author: ctx.session.username,
            userID: ctx.session.userID,
            title: blogTitle,
            abstract: blogAbstract,
            content: blogContent,
            tags: blogTags,
            categories: blogCategories,
            type: blogType,
            status: blogStatus,
            word: blogContent.length,
            read: 0
        });
        await User.update({
            tags: blogTags,
            categories: blogCategories
        }, {
            where: {
                username: ctx.session.username
            }
        });

        let message = blogType === 'draft' ? '保存成功' : '发布成功';
        ctx.body = new SuccessModel(message);
    } catch (err) {
        console.log(err);
        ctx.body = new ErrorModel('操作失败');
    }

};

const getBlogList = async (ctx) => {
    let { limit, offset } =  ctx.request.body;
    try {
        let blogListTotal = await Article.findAll({where:{status: 'published'}});
        let blogList = await Article.findAll({
            attributes: [
                ['id', 'blogID'],
                ['title', 'blogTitle'],
                ['abstract', 'blogAbstract'],
                ['content', 'blogContent'],
                ['createdAt', 'blogTime'],
                ['tags', 'blogTags'],
                ['categories', 'blogCategories'],
                ['read', 'blogRead'],
                ['word', 'blogWord'],
                ['type', 'blogType']
            ],
            where: {
                status: 'published'
            },
            order: [['createdAt', 'desc']],
            limit,
            offset
        });

        ctx.body = new SuccessModel({
            list: blogList,
            total: blogListTotal.length
        });
    } catch (err) {
        console.log(err);
        ctx.body = new ErrorModel('获取失败');
    }

};

module.exports = {
    'POST /blog/save_publish_blog': savePublishBlog,
    'POST /blog/get_blog_list': getBlogList
}