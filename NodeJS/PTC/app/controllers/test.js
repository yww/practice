var Test = require('../models/test');
var Config = require('../models/config')
var app = require('../../app')
var _ = require('underscore');
var moment = require('moment');
var fs  = require('fs');
var path = require('path');


exports.addTest = function(req,res,next){
		var _test=req.body.test;
		_test.owner=req.session.user._id;

		var test= new Test(_test)

		test.save(function(err,test){
			if(err){
				console.log(err)
			}
			var id=test._doc._id;
			res.send({testId:test._doc._id,configId:test._doc.configId})

			req.body.testId = test._doc._id;
			req.body.configId = test._doc.configId
			req.body.action = 'created'

			next();

		    //res.redirect(req.get('referer'))
	})
}

exports.getAllTest = function(req, res){
	if(req.query.projectId){
		Test
		.find({project:req.query.projectId})
		.populate('owner','userName')
		.populate('type','testType')
		.populate('project','name')
		.populate('configId','users')
		.exec(function(err, tests){
			if(err){console.log(err)}
			var _tests=[];
			for(var i in tests){
				var subTest=[{name:tests[i].testName,id:tests[i]._id},tests[i].owner.userName,tests[i].configId.users, moment(tests[i].meta.createAt).format('YYYY/MM/dd HH:mm:ss')]
				_tests.push(subTest)					
			}
			
			res.send(_tests)
		})		
	}else{
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
}

exports.getTest = function(req, res){
	var _id=req.params.id
	Test
	.findById(_id,function(err,test){
		if(err){console.log(err)}
			res.send(test)
	})
}
//upload a new case
exports.uploadCase= function(req,res,next){
	var caseData = req.files.uploadCase
	var filePath = caseData.path
	var originalFilename = caseData.originalFilename

	if(originalFilename){
		fs.readFile(filePath, function(err,data){
			var timestamp = Date.now();
			var type = caseData.type.split('/')[1];
			var newName = timestamp+'.'+'jmx';
			var newPath = path.join(__dirname,'../../','/public/upload/case/'+newName);

			fs.writeFile(newPath,data,function(err){
				console.log(err)
				res.send(newName)
				next()
			})
		})
	}else{next()}
}

//re-excute a test
exports.reExcTest = function(req,res,next){
	var _id = req.body.testId
	var configId
	Test
	.findById(_id,function(err,test){
		if(err){
			console.log(err)
		}else{
			req.body.configId = test._doc.configId
			next()
		}
	})
}

