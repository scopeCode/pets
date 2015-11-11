/**
 * Created by WG on 2015/11/11.
 * 系统日志表的实体,用来记录用户的操作步骤的
 */
var common       =   require("../common/common");
var mysqlCient   =   require("pet/mysql");

var Log = mysqlCient.sequelize.define('T_B_LOG',
    {
        id : {
            type : mysqlCient.Sequelize.BIGINT,
            autoIncrement : true,
            primaryKey : true,
            unique : true,
            field:'ID',
            comment:'主键,自动增长 bigint 长整形'
        },
        sysType:{
            type:mysqlCient.Sequelize.STRING,
            field:"SYS_TYPE",
            comment:'日志的类型,就是系统配置表中的信息.'
        },
        content:{
            type:mysqlCient.Sequelize.STRING,
            field:"CONTENT",
            comment:'日志的详细内容.'
        },
        created:{
            type:mysqlCient.Sequelize.DATE,
            field:"CREATED",
            defaultValue:mysqlCient.Sequelize.NOW,
            get: function()  {
                return common.dateFormat("yyyy-MM-dd HH:mm:ss",this.getDataValue('CREATED'));
            },
            comment:'创建时间'
        }
    },
    {
        freezeTableName: true,  //冻结表名_使用自己设定的表名进行定义
        timestamps:false,       //排除掉,默认的 updateAt createdAt 两个字段
        tableName:'T_B_LOG'    //自定义表名
    }
);

/*
 * 用户表的初始设定,调用的时候,只能是第一次的调用有效
 * */
exports.init = function(){
    if(Log){
        Log.sync({force: true}).then(function () {});
    }
};
exports.Log = Log;