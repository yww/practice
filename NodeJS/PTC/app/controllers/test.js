var Test = require('../models/test');
var app = require('../../app')
var _ = require('underscore');
var moment = require('moment')

exports.addTest = function(req,res){
		var _test=req.body;
		_test.owner=req.session.user._id;
		var test= new Test({
			_test
		})

		test.save(function(err,test){
			if(err){
				console.log(err)
			}
			var node = [test.name, req.session.user.userName, test.type,test.users, moment(test.meta.createAtmoment).format('YYYY/MM/DD HH:mm:ss')]
		    res.send(node)
	})
}

exports.getAllTest = function(req, res){
	Test
	.find({})
	.populate('owner','userName')
	.populate('type','testType')
	.populate('project','name')
	.exec(function(err, tests){
		if(err){console.log(err)}
			res.send(tests)
	})
}

//upload a new case
exports.uploadCase= function(){

}


