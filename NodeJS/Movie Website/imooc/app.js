var express = require('express');
var path = require('path');
var mongoose = require('mongoose');
var expressSession = require('express-session');
var mongoStore = require('connect-mongo')(expressSession);
var _ = require('underscore');
var serveStatic = require('serve-static');
var bodyParser = require('body-parser');
//require mongoose models
var Movie = require('./models/movie');
var User = require('./models/user');

//
var port= process.env.PORT || 3000;
var app = express();

//
var dbUrl = 'mongodb://localhost:27017/imooc';

//connect to mongoDB
mongoose.Promise = global.Promise;
mongoose.connect(dbUrl,function(err){
	if(err){
		console.log('database connection failure '+ err)
	}
	console.log('database connection established')
	}
)

//set static resource path
app.set('views','./views/pages');
app.set('view engine','jade');
app.use(bodyParser({extended:true}));
//app.use(cookieParser());
app.use(expressSession({
	secret: 'imooc',
	store: new mongoStore({
		url: dbUrl,
		collection: 'session'
	})
}));
app.use(serveStatic(path.join(__dirname,'public')));
app.locals.moment = require('moment');
app.listen(port);

console.log('imooc started on port'+port);

//index page
app.get('/',function(req,res){

		console.log(req.session.user);

		Movie.fetch(function(err, movies){
			if(!err){
				console.log(err)
			}
		res.render('index',{
			title:'imooc 首页',
			movies: movies
		})
	})
})

//detail page
app.get('/movie/:id',function(req,res){
	var id = req.params.id;
	Movie.findById(id,function(err, movie){
		res.render('detail',{
		title:'imooc '+ movie.title,
		movie: movie		
		})
	})
})

//admin record page
app.get('/admin/movie',function(req,res){
		res.render('admin',{
		title:'imooc 后台录入',
		movie: 
		{
			title:'',
			director:'',
			country:'',
			year:'',
			poster:'',
			flash:'',
			summary:'',
			language:''
		}
	})
})

//admin post movie (to add movie)
app.post('/admin/movie/new',function(req,res){
	var id = req.body.movie._id;
	var movieObj = req.body.movie;
	var _movie;

	if(id !=='undefined'){
		Movie.findById(id,function(err,movie){
			if (err){
				console.log(err)
			}
			_movie=_.extend(movie,movieObj);
			_movie.save(function(err,movie){
				if(err){
					console.log(err)
				}
				res.redirect('/movie/'+movie._id)
			})
		})
	}else{
		_movie = new Movie({
			director: movieObj.director,
			title: movieObj.title,
			year: movieObj.year,
			language: movieObj.language,
			summary: movieObj.summary,
			poster: movieObj.poster,
			flash: movieObj.flash,
			country: movieObj.country
		})

		_movie.save(function(err,movie){
			if(err){
				console.log(err)
			}
			res.redirect('/movie/'+movie._id)
		})
	}
})

//admin update movie page
app.get('/admin/update/:id',function(req,res){
	var id = req.params.id;
	if(id){
		Movie.findById(id,function(err,movie){
			
			res.render('admin',{
				title :'imooc 后台更新页',
				movie: movie
			})
		})
	}
})

//list page
app.get('/admin/list',function(req,res){
	Movie.fetch(function(err, movies){
		if(err){
			console.log(err)
		}
		res.render('list',{
		title:'imooc 列表页',
		movies:movies
		})	
	})
})

//list delete movie
app.delete('/admin/list',function(req,res){
	var id = req.query.id;

	if(id){
		Movie.remove({_id:id},function(err, movie){
			if(err){
				console.log(err)
			}else{
				res.json({
					success:1
				})
			}
		})
	}
})

//User signin
app.post('/user/singin',function(req,res){
	var _user=req.body.user;
	var name=_user.name;
	var password=_user.password;

	User.findOne({name:name},function(err,user){
		if(err){
			console.log(err)
		}
		if(!user){
			return res.redirect('/')
		}
		user.comparePassword(password,function(err,isMatch){
			if(err){
				return console.log(err)
			}
			if(isMatch){
				req.session.user = user;
				return res.redirect('/') 
				res.redirect('/')
			}else{
				console.log('Password don\'t match')
				res.end();
			}
		})
	})
})

//User signup
app.post('/user/signup',function(req,res){
	var _user = req.body.user;
	//req.param('user') priority: path > body >query string
	//req.query.user
	//req.params.user only /sign/signup/:user

	User.find({name:_user.name},function(err,user){
		if(err){
			console.log(err)
		}
		if(user.length>0){
			return res.redirect('/admin/userList')
		}else{
				var user = new User(_user);
				user.save(function(err,user){
				if(err){
					console.log(err)
				}
				res.redirect('/admin/userList')
			})
		}
	})
})

//user list page
app.get('/admin/userList',function(req,res){
	User.fetch(function(err,users){
		if(err){
			console.log(err)
		}

		res.render('userList',{
			title: 'User list',
			users:users
		})
	})
})

//delete user
app.delete('/user/userList',function(req,res){
	var id = req.query.id;

	if(id){
		User.remove({_id:id},function(err,user){
			if(err){
				console.log(err)
			}else{
				res.json({
					success:1
				})
			}
		})
	}
})




//Delete user
app.delete('/admin/list',function(req,res){
	var id = req.query.id;

	if(id){
		Movie.remove({_id:id},function(err, movie){
			if(err){
				console.log(err)
			}else{
				res.json({
					success:1
				})
			}
		})
	}
})