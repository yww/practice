var express = require('express')
var path = require('path')
var mongoose = require('mongoose')
var expressSession = require('express-session')
var bodyParser = require('body-parser')
var serveStatic = require('serve-static')
var mongoStore = require('connect-mongo')(expressSession)
var morgan = require('morgan')
var User = require('./app/controllers/user')
var Control = require('./app/controllers/control')
var multiparty = require('connect-multiparty')
var port = process.env.PORT || 8080
var app = express()
var dbUrl = 'mongodb://localhost:27017/ptc'

app.listen(port)
console.log('ptc started on'+ port)

//connet mongoDB
mongoose.Promise = global.Promise

mongoose.connect(dbUrl, function(err){
	if(err){
		console.log(err)
	}else{
		console.log('db conncetion established')
	}
})

//parse request body and session
app.use(bodyParser({extended: true}))
app.use(expressSession({
	secret: 'ptc',
	store: new mongoStore({
		url: dbUrl,
		collection: 'session'
	})
}))

//parse multipart form data
app.use(multiparty())


//static resource
app.use(serveStatic(path.join(__dirname,'public')))
app.locals.moment = require('moment')

//require routes file
require('./config/routes')(app)

//polling database, to start/kill/ tasks or copy log  
  Control.execTask()
   //setInterval(Control.execTask,5000)
   // setInterval(Control.FinishTask, 5000) 
   // setInterval(Control.killExpired,10000)
// setInterval(parseLog, 30000)

