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
    debugPclient(" /admin/auth.js  ==== authentication,session is need = %s",
        JSON.stringify(req.session.adminUser));
    if (!req.session.adminUser) {
        req.session.error='请先登陆';
        return res.redirect('/admin/login');
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
    debugPclient(" /admin/auth.js  ==== notAuthentication,session is not need!");
    if (req.session.adminUser) {
        return res.redirect('/admin/index');
    }
    next();
};