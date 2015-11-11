/**
 * Created by WG on 2015/11/11.
 */


/**
 * show 网站首页 index page
 * @param  {object}   req  the request object
 * @param  {object}   res  the response object
 * @param  {Function} next the next handler
 * @return {null}
 */
exports.index = function(req,res,next){
    try{
        debugPsite("admin/index");
        res.render("admin/index");
    }catch(ex){
        next(ex);
    }
};