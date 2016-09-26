
var Movie = require('../models/movie');
var Comment = require('../models/movie');
var _ = require('underscore');
//detail page
exports.detail = function(req,res){
	var id = req.params.id;
	console.log(id)
	Movie.findById(id,function(err, movie){
		Comment
			.find({movie: id})
			.populate('from','name')
			.exec(function(err, comments){
				console.log(comments)
				if(err){console.log(err)}
				res.render('detail',{
				title:'imooc '+ movie.title,
				movie: movie,
				comments: comments		
			})
		})	
	})
}

//admin record page
exports.new = function(req,res){
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
}

//admin post movie (to add movie)
exports.save = function(req,res){
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
}

//admin update movie page
exports.update = function(req,res){
	var id = req.params.id;
	if(id){
		Movie.findById(id,function(err,movie){
			
			res.render('admin',{
				title :'imooc 后台更新页',
				movie: movie
			})
		})
	}
}

//list page
exports.list = function(req,res){
	Movie.fetch(function(err, movies){
		if(err){
			console.log(err)
		}
		res.render('list',{
		title:'imooc 列表页',
		movies:movies
		})	
	})
}

//list delete movie
exports.del = function(req,res){
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
}