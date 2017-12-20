
var User = require('../models/user');
var app = require('../../app')
//User signup

//show signup
exports.showSignup = function(req,res){
	User.fetch(function(err,users){
		res.render('signup',{
			title: 'signup',
			users:users
		})
	})
}

exports.signup = function(req,res){
	var _user = req.body.user;
	//req.param('user') priority: path > body >query string
	//req.query.user
	//req.params.user only /sign/signup/:user

	User.find({name:_user.name},function(err,user){
		if(err){
			console.log(err)
		}
		if(user.length>0){
			return res.redirect('/signin')
		}else{
				var user = new User(_user);
				user.save(function(err,user){
				if(err){
					console.log(err)
				}
				res.redirect('/')
			})
		}
	})
}


//User signin

//show signin
exports.showSignin = function(req,res){
	User.fetch(function(err,users){
		res.render('signin',{
			title: 'signin',
			users:users
		})
	})
}

exports.signin = function(req,res){
	var _user=req.body.user;
	var name=_user.name;
	var password=_user.password;

	User.findOne({name:name},function(err,user){
		if(err){
			console.log(err)
		}
		if(!user){
			return res.redirect('/signup')
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
				res.redirect('/signin')
				res.end();
			}
		})
	})
}

//User logout
exports.logout = function(req,res){
	
		delete req.session.user;
		//delete app.locals.user;
		res.redirect('/')
	
}


//user list page
exports.list = function(req,res){
	User.fetch(function(err,users){
		if(err){
			console.log(err)
		}

		res.render('userList',{
			title: 'User list',
			users:users
		})
	})
}

//delete user
exports.del = function(req,res){
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
}

//User middleware
exports.signinRequired = function(req,res,next){
	var user = req.session.user

	if(!user){
		return res.redirect('/signin')
	}
	next()
}

exports.adminRequired = function(req,res,next){
	var user = req.session.user

	if(user.role <=10){
		return res.redirect('/signin')
	}
	next()
}