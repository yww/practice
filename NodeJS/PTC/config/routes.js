var User = require('../app/controllers/user')

module.exports = function(app){

	//user prehandling 
	app.use(User.signinRequired)
	app.use(function(req,res,next){
		var _user = req.session.user
		console.log('Current user\'s session ' )
		console.log(req.session)
		app.locals.user = _user
		next()
	})

	//index page
	app.get('/',function(req,res){
		res.redirect('/html/index.html')
	})

	app.post('/signin',User.signin)
	app.post('/signup',User.signup)
	app.get('/logout',User.logout)
	app.get('/session/user',User.sessionUser)
}

