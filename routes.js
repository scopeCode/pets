/**
 * Created by scj-mo on 2015/11/10.
 * 所有的访问路径的承载者
 */

var common  = require("./common/common");

module.exports = function (app) {


    //404错误页面的处理
    app.use(function(req, res, next) {
        var err = new Error('Not Found');err.status = 404;next(err);
    });
    //其他错误的处理
    app.use(function(err, req, res, next) {
        var status = err.status || 500;
        res.status(status);

        if(err){
            global.logger.error("[error]:"+common.stringify(err));
        }

        if(404 == status){
            req.session.error={
                title:"404错误",
                message: err.message,
                error: {}
            };
            return res.redirect('/404');
        }else if(500 == status){
            req.session.error={
                title:"500错误",
                message: err.message,
                error: {}
            };
            return res.redirect('/500');
        }
        next();
    });

    //应用程序出错执行的处理
    process.on("uncaughtException", function (err) {
        global.logger.error("[uncaughtException]:"+err);
    });
}