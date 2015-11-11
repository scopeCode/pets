/**
 * Created by WG on 2015/11/11.
 */

/**
 * show client login page
 * @param  {object}   req  the request object
 * @param  {object}   res  the response object
 * @param  {Function} next the next handler
 * @return {null}
 */
exports.login = function(req,res,next){
    try{
        debugPsite("client/login");
        res.render("client/login");
    }catch(ex){
        next(ex);
    }
};

/**
 * Post 登录请求
 * @param  {object}   req  the request object
 * @param  {object}   res  the response object
 * @param  {Function} next the next handler
 * @return {null}
 */
exports.signin = function(req,res,next){
    try{


        /*
        * form 表单提交，如何有问题 则
        * */

        debugPsite("client/login");
        var user = {
            uid:12,
            uname:'wer'
        };
        req.session.clientUser = user;
        return res.redirect('/client/index');
    }catch(ex){
        next(ex);
    }
};

/**
 * 登出的GET请求
 * @param  {object}   req  the request object
 * @param  {object}   res  the response object
 * @param  {Function} next the next handler
 * @return {null}
 */
exports.logout = function(req,res,next){
    try{
        debugPsite("client/logout");
        req.session.clientUser = null;
        return res.redirect('/client/login');
    }catch(ex){
        next(ex);
    }
};