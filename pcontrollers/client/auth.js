/**
 * Created by WG on 2015/11/11.
 * 认证控制器,主要包括 需要登录的认证和不需要认证的控制器
 */

/**
 * authentication login page
 * @param  {object}   req  the request object
 * @param  {object}   res  the response object
 * @param  {Function} next the next handler
 * @return {null}
 */
exports.authentication = function (req, res, next) {
    debugPclient(" /client/auth.js  ==== authentication,session is need = %s",
        JSON.stringify(req.session.clientUser));
    if (!req.session.clientUser) {
        req.session.error='请先登陆';
        return res.redirect('/client/login');
    }
    next();
};

/**
 * notAuthentication login page
 * @param  {object}   req  the request object
 * @param  {object}   res  the response object
 * @param  {Function} next the next handler
 * @return {null}
 */
exports.notAuthentication = function (req, res, next) {
    debugPclient(" /client/auth.js  ==== notAuthentication,session is not need!");
    if (req.session.clientUser) {
        return res.redirect('/client/index');
    }
    next();
};