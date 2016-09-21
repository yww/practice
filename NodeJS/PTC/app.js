var express = require('express')
var path = require('path')
var mongoose = require('mongoose')
var expressSession = require('express-session')
var bodyParser = require('body-parser')
var serveStatic = require('serve-static')
var mongoStore = require('connect-mongo')(expressSession)
var morgan = require('morgan')

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

//specify view and model path
//app.set('view'/'./app/view/pages')
//app.set('view engine', 'jade')

//parse request body and session
app.use(bodyParser({extended: true}))
app.use(expressSession({
	secret: 'ptc',
	store: new mongoStore({
		url: dbUrl,
		collection: 'session'
	})
}))

//static resource
app.use(serveStatic(path.join(__dirname,'public')))
app.locals.moment = require('moment')

//require routes file
require('./config/routes')(app)



