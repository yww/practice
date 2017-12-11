//resource

var Index = require('../app/controllers/index')
var User = require('../app/controllers/user')
var Movie = require('../app/controllers/movie')
var Comment = require('../app/controllers/comment')

module.exports = function(app){
	
	//user prehandleing
	app.use(function(req,res,next){
		var _user=req.session.user;
		console.log(_user)
			app.locals.user=_user
			next()	
	})

	//index page
	app.get('/',Index.index)

	//User
	app.post('/user/signup',User.signup)
	app.post('/user/signin',User.signin)
	app.get('/user/logout',User.logout)
	app.get('/admin/user/list',User.signinRequired,User.adminRequired,User.list)
	app.delete('/admin/user/list',User.signinRequired,User.adminRequired,User.del)
	app.get('/signin',User.showSignin)
	app.get('/signup',User.showSignup)

	//Movie
	app.get('/movie/:id',Movie.detail)
	app.get('/admin/movie/new',User.signinRequired,User.adminRequired,Movie.new)
	app.get('/admin/movie/update/:id',User.signinRequired,User.adminRequired,Movie.update)
	app.post('/admin/movie',User.signinRequired,User.adminRequired,Movie.save)
	app.get('/admin/movie/list',User.signinRequired,User.adminRequired,Movie.list)
	app.delete('/admin/movie/list',User.signinRequired,User.adminRequired,Movie.del)

	//Comment
	app.post('/user/comment',User.signinRequired,Comment.save)
	
}