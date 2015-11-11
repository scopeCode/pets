/**
 * Created by WG on 2015/11/11.
 * 用户信息的 schema  实体对象
 */
var common       =   require("../common/common");
var mysqlCient   =   require("pet/mysql");

var User = mysqlCient.sequelize.define('T_B_USER',
    {
        id : {
            type : mysqlCient.Sequelize.BIGINT,
            autoIncrement : true,
            primaryKey : true,
            unique : true,
            field:'ID',
            comment:'主键,自动增长 bigint 长整形'
        },
        userName:{
            type:mysqlCient.Sequelize.STRING,
            field:"USER_NAME",
            comment:'登录的用户名,手机号,数据库提供默认的正则的验证.',
            validate:{
                is:/^(((13[0-9]{1})|(14[0-9]{1})|(15[0-9]{1})|(17[0-9]{1})|(18[0-9]{1}))+\d{8})$/
            }
        },
        userPwd:{
            type:mysqlCient.Sequelize.STRING,
            field:"USER_PWD",
            comment:'登录密码,MD5加密'
        },
        registerIp:{
            type:mysqlCient.Sequelize.STRING,
            field:"REGISTER_IP",
            comment:'注册的IP地址,默认是 REQ 获得的数据'
        },
        registerTime:{
            type:mysqlCient.Sequelize.DATE,
            field:"REGISTER_TIME",
            defaultValue:mysqlCient.Sequelize.NOW,
            get: function()  {
                return common.dateFormat("yyyy-MM-dd HH:mm:ss",this.getDataValue('REGISTER_TIME'));
            },
            comment:'注册的时间,注意是否是需要进行时区的设定.'
        }
    },
    {
        freezeTableName: true,  //冻结表名_使用自己设定的表名进行定义
        timestamps:false,       //排除掉,默认的 updateAt createdAt 两个字段
        tableName:'T_B_USER'    //自定义表名
    }
);

/*
* 用户表的初始设定,调用的时候,只能是第一次的调用有效
* */
exports.init = function(){
    if(User){
        User.sync({force: true}).then(function () {});
    }
};
exports.User = User;