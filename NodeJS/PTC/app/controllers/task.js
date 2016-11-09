var Task = require('../models/task');
var Test = require('../models/test');
var Config = require('../models/Config');
var app = require('../../app')
var _ = require('underscore');
var moment = require('moment')
var fs = require('fs')
var configObj = JSON.parse(fs.readFileSync(__dirname + '/../../config/config.json', 'utf8'))
var host = configObj.targetMachine.host

exports.getAllTask = function(req, res){
		Task
		.find({})
		.populate('commitId','userName')
		.populate('testId','testName')
		.exec(function (err, tasks) {
			var _tasks=[];
			for(var i in tasks){
				var subTask=[tasks[i].testId.testName, tasks[i].commitId.userName, moment(tasks[i].meta.recordAt).format('YYYY/MM/dd HH:mm:ss'), moment(tasks[i].meta.endAt).format('YYYY/MM/dd HH:mm:ss'), tasks[i].status, host+'/'+tasks[i]._id]
				_tasks.push(subTask)
			}
			res.send(_tasks)
		})
}

exports.addTask = function(req,res){
	var _testId = req.body.testId;
	var _configId = req.body.configId;

	//set commiter to current user
	var _commitId=req.session.user._id;

	var task= new Task({
		commitId:_commitId,
		testId: _testId,
		configId: _configId
	})

	task.save(function(err,task){
		if(err){
			console.log(err)
		}
		res.send(task)
	})
}


