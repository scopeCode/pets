/**
 * Created by scj-mo on 2015/11/10.
 * 所有的访问路径的承载者
 */

var common      = require("./common/common");
var errors          = require("./pcontrollers/errors/errors");

var siteIndex       = require("./pcontrollers/site/index");


var clientAuth      = require("./pcontrollers/client/auth");
var clientIndex     = require("./pcontrollers/client/index");
var clientLogin     = require("./pcontrollers/client/login");

var adminAuth      = require("./pcontrollers/admin/auth");
var adminIndex     = require("./pcontrollers/admin/index");

module.exports = function (app) {

    /**[site路由的处理-start]****************************************************************/
    app.route("/site/").get(siteIndex.index);
    app.route("/site/index").get(siteIndex.index);
    /**[site路由的处理-end]******************************************************************/


    /**[client路由的处理-start]****************************************************************/
    app.route("/").all(clientAuth.authentication).get(clientIndex.index);
    app.route("/client/").all(clientAuth.authentication).get(clientIndex.index);
    app.route("/client/index").all(clientAuth.authentication).get(clientIndex.index);

    app.route("/client/login").all(clientAuth.notAuthentication).get(clientLogin.login);//GET       登录界面
    app.route("/client/logout").get(clientLogin.logout);//POST    登录
    app.route("/client/signin").all(clientAuth.notAuthentication).post(clientLogin.signin);//GET    登出操作
    /**[client路由的处理-end]******************************************************************/


    /**[admin路由的处理-start]****************************************************************/
    app.route("/admin/").all(adminAuth.authentication).get(adminIndex.index);
    app.route("/admin/index").all(adminAuth.authentication).get(adminIndex.index);
    /**[admin路由的处理-end]******************************************************************/


    /**[全局错误处理--start]******************************************************************/
    app.route("/errors/404").get(errors.show404);
    app.route("/errors/500").get(errors.show500);
    //404错误页面的处理
    app.use(function(req, res, next) {
        var err = new Error('Not Found');
        err.status = 404;
        next(err);
    });
    //其他错误的处理
    app.use(function(err, req, res, next) {
        var status = err.status || 500;
        res.status(status);

        if(err){
            logger.error("[error]:"+common.stringify(err));
        }
        if(404 == status){
            req.session.error={
                title:"404错误",
                message: err.message,
                error: {}
            };
            return res.redirect('/errors/404');
        }else if(500 == status){
            req.session.error={
                title:"500错误",
                message: err.message,
                error: {}
            };
            return res.redirect('/errors/500');
        }
        next();
    });
    //应用程序出错执行的处理
    process.on("uncaughtException", function (err) {
        logger.error("[uncaughtException]:"+err);
    });
    /**[全局错误处理--end]***********************************************************************/
};