//Actitivy means what user has done recently.upload new test, update test etc...

var Activity = require('../models/activity');
var moment = require('moment');
var path = require('path');

exports.addAcctivity = function(req,res){
	var _activity = {}
	_activity.user = req.session.user._id;
	_activity.action = req.body.action;
	_activity.target = req.body.testId;
	_activity.config = req.body.configId;

	var activity = new Activity(_activity)

	activity.save(function(err, activity){

	})
}

exports.getAllActivity = function(req,res){
	Activity
	.find({})
	.populate('user','userName')
	.populate('target','testName')
	.populate('config','users')
	.exec(function(err, activities){
		// var _projects=[];
		// for(var i in projects){
		// 	var subProject=[{name:projects[i].name,id:projects[i]._id}, projects[i].desc, projects[i].owner.userName, moment(projects[i].meta.createAt).format('YYYY/MM/DD')]
		// 	_projects.push(subProject)
		// }
		activities.forEach(function(A){
			console.log(moment(A.meta.createAt).fromNow())
			A.updateAt= 123
		})
		console.log(activities)
		res.send(activities)
	})
}



