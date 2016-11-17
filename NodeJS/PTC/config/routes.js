var User = require('../app/controllers/user')
var Task = require('../app/controllers/task')
var Project = require('../app/controllers/project')
var Activity = require('../app/controllers/activity')
var Test = require('../app/controllers/test')
var Config = require('../app/controllers/config')

module.exports = function(app){
	//user prehandling 
	app.use(function(req,res,next){
		var _user = req.session.user
		//for debug use
		console.log('Current user\'s session ' )
		console.log(req.session)
		app.locals.user = _user
		next()
	})

	//index page
	app.get('/',function(req,res){
		res.redirect('/index.html')
	})

	app.post('/signin',User.signin)
	app.post('/signup',User.signup)
	app.get('/logout',User.logout)

	//used when $(document).ready(), redirect to login page if user not login 
	app.get('/session/user',User.sessionUser)


	//Task Operation
	app.get('/task',Task.getAllTask)
	app.post('/task',Task.addTask)

	//Project Operation
	app.get('/project',Project.getAllProject)
	app.get('/project/:id', Project.getProject)
	app.post('/project',Project.addProject)

	//Test Operation
	app.get('/test',Test.getAllTest)
	app.get('/test/:id',Test.getTest)
	app.post('/test',Config.addConfig,Test.addTest,Activity.addAcctivity)
	app.post('/reExcTest',Test.reExcTest,Task.addTask)
	app.post('/upload',Test.uploadCase)

	//Activity operation
	app.get('/activity',Activity.getAllActivity)
}

