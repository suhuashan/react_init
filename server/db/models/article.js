let Sequelize = require("sequelize");
let sequelize = require("../index.js");

const Article = sequelize.define(
    "article",
    {
        id: {
            primaryKey: true,
            type: Sequelize.INTEGER,
            autoIncrement: true
        },
        author: Sequelize.STRING(100),       //博客作者
        title: Sequelize.STRING,             //博客标题
        abstract: Sequelize.STRING,          //博客摘要
        word: Sequelize.STRING(1000),        //博客内容的字数
        read: Sequelize.INTEGER,             //博客浏览次数
        tags: Sequelize.STRING(1000),        //博客标签
        categories: Sequelize.STRING(1000),  //博客分类专栏
        content: Sequelize.TEXT,             //博客内容
        type: Sequelize.STRING(20),          //博客类型（原创，转载，翻译）
        status: Sequelize.STRING(20)         //博客状态（草稿，已发布）            
    },
    {
        charset: 'utf8',
        timestamps: true,
        freezeTableName: true
    }
);

Article.associate = function (models) {
    models.article.belongsTo(models.user,{
        foreignKey: 'userID',
        targetKey: 'id'
    });
};

module.exports = Article;

