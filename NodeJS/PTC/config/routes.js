var User = require('../app/controllers/user')
var Task = require('../app/controllers/task')
var Project = require('../app/controllers/project')
var Test = require('../app/controllers/test')

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
	app.get('/getAllTask',Task.getAllTask)
	app.post('/addTask',Task.addTask)

	//Project Operation
	app.get('/project',Project.getAllProject)
	app.get('/project/:id', Project.getProject)
	app.post('/project',Project.addProject)

	//Test Operation
	app.get('/test',Test.getAllTest)
	app.get('/test/:id',Test.getTest)
	app.post('test',Test.addTest)
	
}

