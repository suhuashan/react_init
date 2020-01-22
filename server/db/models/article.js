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
        title: Sequelize.STRING,
        word: Sequelize.STRING(1000),   //博客内容的字数
        read: Sequelize.INTEGER,
        tags: Sequelize.STRING(1000),
        categories: Sequelize.STRING(1000),
        content: Sequelize.TEXT
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

