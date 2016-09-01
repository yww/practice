var express=require('express');
var port= process.env.PORT || 3000;
var path = require('path');
var mongoose = require('mongoose');
var _=require('underscore');
var serveStatic=require('serve-static');
var bodyParser=require('body-parser');
var Movie = require('./models/movie');


var app = express();

//connect to mongoDB
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/imooc',function(){
	console.log('connection established')
	}
)

//set static resource path
app.set('views','./views/pages');
app.set('view engine','jade');
app.use(bodyParser({extended:true}));
app.use(serveStatic(path.join(__dirname,'library')));
app.locals.moment = require('moment');
app.listen(port);

console.log('imooc started on port'+port);

//index page
app.get('/',function(req,res){
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
			direcotr:'',
			country:'',
			year:'',
			poster:'',
			flash:'',
			summary:'',
			language:''
		}
	})
})

//admin update movie page
app.get('/admin/update/:id',function(req,res){
	var id = req.params.id;
	console.log(id)
	if(id){
		Movie.findById(id,function(err,movie){
			//console.log('MOVIE: '+movie)
			res.render('admin',{
				title :'imooc 后台更新页',
				movie: movie
			})
		})
	}
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
			director: movieObj.direcor,
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




