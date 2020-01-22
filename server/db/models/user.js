var Sequelize = require("sequelize");
var sequelize = require("../index.js");

const User = sequelize.define(
    "user",
    {
        id: {
            primaryKey: true,
            type: Sequelize.INTEGER,
            autoIncrement: true
        },
        username: Sequelize.STRING,
        password: Sequelize.STRING,
        desc: Sequelize.TEXT,
        signature: Sequelize.TEXT,
        avatar: Sequelize.STRING(1000),
        tags: Sequelize.TEXT                        
    },
    {
        charset: 'utf8',
        timestamps: true,
        freezeTableName: true
    }
);

User.associate = function (models) { 
    models.user.hasMany(models.article, {
        foreignKey: 'userID',
        targetKey: 'id'
    });
};
module.exports = User;

