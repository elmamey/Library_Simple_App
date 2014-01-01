
/*
 * GET Login page.
 */

exports.index = function(req, res){
  res.render('login', { errorMessage: req.flash('error') });
};