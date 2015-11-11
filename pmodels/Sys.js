/**
 * Created by WG on 2015/11/11.
 * 整个系统的配置模型
 */
var common       =   require("../common/common");
var mysqlCient   =   require("pet/mysql");

var Sys = mysqlCient.sequelize.define('T_B_SYS',
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
            comment:'系统模型下的类型,为了读取对应类型的方便.'
        },
        sysName:{
            type:mysqlCient.Sequelize.STRING,
            field:"SYS_NAME",
            comment:'分类名称,用于页面显示用,例如:性别_男,女.'
        },
        sysValue:{
            type:mysqlCient.Sequelize.STRING,
            field:"SYS_VALUE",
            comment:'分类对应的值, 例如:男 1 女 0.'
        },
        sysStatus:{
            type:mysqlCient.Sequelize.BIT,
            field:"SYS_STATUS",
            comment:'分类对应状态,0:未启用,1:启用.',
            defaultValue:true
        },
        sysSort:{
            type:mysqlCient.Sequelize.INTEGER,
            field:"SYS_SORT",
            comment:'分类对应的排序,值越大显示越靠前.',
            defaultValue:0
        },
        isDelete:{
            type:mysqlCient.Sequelize.BIT,
            field:"IS_DELETE",
            comment:'是否删除的标志,0:未删除,1:删除.',
            defaultValue:false
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
        tableName:'T_B_SYS'    //自定义表名
    }
);

/*
 * 用户表的初始设定,调用的时候,只能是第一次的调用有效
 * */
exports.init = function(){
    if(Sys){
        Sys.sync({force: true}).then(function () {});
    }
};
exports.Sys = Sys;