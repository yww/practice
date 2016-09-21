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
			console.log('User doesn\'t exist')
			return res.redirect('/html/login.html')
		}

		user.comparePassword(password, function(err, isMatch){
			if(err){
				console.log(err)
			}

			if(isMatch){
				req.session.user = user;
				return res.redirect('/')
			}else{
				console.log('Password don\'t match')
				res.redirect('/html/login.html')
				res.end()
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
			return res.redirect('/html/login.html')
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
	res.redirect('/html/login.html')
}
//customized middleware, handle permission check
exports.signinRequired = function(req, res, next){
	var user = req.session.user

	if(!user){
		return res.redirect('/html/login.html')
	}
	next()
}

exports.adminRequired = function(req, res, next){
	var user = req.session.user

	if(user.rolg < 10){
		return res.redirect('/login.html#signup')
	}
	next()
}