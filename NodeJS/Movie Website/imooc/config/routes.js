//resource

var Index = require('../app/controllers/models/index');
var User = require('../app/controllers/models/user');
var Movie = require('../app/controllers/models/movie');

module.exports = function(app){
	
	//user prehandleing
	app.use(function(req,res,next){
		var _user=req.session.user;
			app.locals.user=_user;
			next()	
	})

	//index page
	app.get('/',Index.index);

	//signup
	app.post('/user/signup',User.signup);

	//signin
	app.post('/user/signin',User.signin);

	//logout
	app.get('/logout',User.logout);

	//user list
	app.get('/admin/userList',User.list);

	//delete user
	app.delete('/admin/userList',User.del);

	//movie detail
	app.get('/movie/:id',Movie.detail);

	//admin record movie
	app.get('/admin/new',Movie.new);

	//admin update movie
	app.get('/admin/update/:id',Movie.update);

	//admin save movie
	app.post('/admin/movie',Movie.save);

	//admin list movie
	app.get('/admin/list',Movie.list);

	//admin delete movie
	app.delete('/admin/list',Movie.del)
	
}