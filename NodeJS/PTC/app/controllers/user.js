var User = require('../models/user');
var app = require('../../app')

//signin
exports.signin = function(req,res){
	var _user = req.body.user
	var email = _user.email
	var password = _user.password

	User.findOne({email: email},function(err,user){
		if(err){
			console.log(err)
		}
		if(!user){
			res.send({error: "User doesn't exist", code: 500})
			console.log('User doesn\'t exist')
			return res.redirect('/login.html')
		}

		user.comparePassword(password, function(err, isMatch){
			if(err){
				console.log(err)
			}

			if(isMatch){
				req.session.user = user;
				return res.redirect('/')
			}else{
				res.send({error: "Password don\'t match", code: 500})
				console.log('Password don\'t match')
			}
		})
	})
}


//user signup
exports.signup = function(req,res){
	var _user = req.body.user

	User.find({email: _user.email},function(err,user){
		if(err){
			console.log(err)
		}
		if(user.length >0){
			return res.redirect('/login.html')
		}else{
			var user = new User(_user)
			user.save(function(err,user){
				if(err) console.log(err)
					res.redirect('/')
			})
		}
	})
}

//logout 
exports.logout = function(req,res){
	delete req.session.user
	res.redirect('/login.html')
}

//sessionUser
exports.sessionUser = function(req,res){
	if(!req.session.user){
		res.send({error: "error msg", code: 400})
	}else{
		res.send({name:req.session.user.userName})
	}
	
}

//customized middleware, handle permission check
exports.signinRequired = function(req, res, next){
	var user = req.session.user
	if(!user){
		return res.send({error: "not authorized", code: 400})
	}
	next()
}

exports.adminRequired = function(req, res, next){
	var user = req.session.user

	if(user.role < 10){
		return res.redirect('/login.html#signup')
	}
	next()
}