/**
 * Created by WG on 2015/11/11.
 * 用户基本信息的模型 与 用户的关系 是 1:1
 */
var common       =   require("../common/common");
var mysqlCient   =   require("pet/mysql");

var UserInfo = mysqlCient.sequelize.define('T_B_USER_EX',
    {
        id:{
            type : mysqlCient.Sequelize.BIGINT,
            autoIncrement : true,
            primaryKey : true,
            unique : true,
            field:'ID',
            comment:'主键,自动增长 bigint 长整形'
        },
        userId:{
            type:mysqlCient.Sequelize.BIGINT,
            field:"USER_ID",
            comment:'用户表的主键ID'
        },
        userNick:{
            type:mysqlCient.Sequelize.STRING,
            field:"NICK",
            comment:'用户的昵称'
        },
        sex:{
            type:mysqlCient.Sequelize.BIGINT,
            field:"SYS_SEX_ID",
            comment:'系统表中性别的ID'
        },
        birth:{
            type:mysqlCient.Sequelize.DATE,
            field:"BIRTH",
            comment:'用户的出生日期',
            defaultValue:null,
            get: function()  {
                return common.dateFormat("yyyy-MM-dd HH:mm:ss",this.getDataValue('BIRTH'));
            }
        },
        photo:{
            type:mysqlCient.Sequelize.STRING,
            field:"PHOTO",
            comment:'用户的头像信息,除非特殊情况,一般都是hash码'
        },
        created:{
            type:mysqlCient.Sequelize.DATE,
            field:"CREATED",
            defaultValue:mysqlCient.Sequelize.NOW,
            get: function()  {
                return common.dateFormat("yyyy-MM-dd HH:mm:ss",this.getDataValue('CREATED'));
            },
            comment:'创建时间.'
        }
    },
    {
        freezeTableName: true,  //冻结表名_使用自己设定的表名进行定义
        timestamps:false,       //排除掉,默认的 updateAt createdAt 两个字段
        tableName:'T_B_USER_EX'    //自定义表名
    }
);

/*
 * 用户表的初始设定,调用的时候,只能是第一次的调用有效
 * */
exports.init = function(){
    if(UserInfo){
        UserInfo.sync({force: true}).then(function () {});
    }
};
exports.UserInfo = UserInfo;
