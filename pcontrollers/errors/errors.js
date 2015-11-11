/**
 * Created by WG on 2015/11/11.
 * 错误信息的跳转指向
 * 404.ejs
 * 500.ejs
 */

/**
 * show 500 page
 * @param  {object}   req  the request object
 * @param  {object}   res  the response object
 * @param  {Function} next the next handler
 * @return {null}
 */
exports.show500 = function (req, res, next) {
    try{
        res.render("errors/500");
    }catch(ex){
        next(ex);
    }
};

/**
 * show 404 page
 * @param  {object}   req  the request object
 * @param  {object}   res  the response object
 * @param  {Function} next the next handler
 * @return {null}
 */
exports.show404 = function (req, res, next) {
    try{
        res.render("errors/404");
    }catch(ex){
        next(ex);
    }
};
