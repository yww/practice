var Task = require('../models/task');
var app = require('../../app')

var moment = require('moment')
// exports.getAllTask = function(req, res){
// 	Task.fetch(function(err,tasks){
// 		if(err){
// 			console.log(err)
// 		}
// 			console.log(tasks)
// 	})
// }


exports.getAllTask = function(req, res){

	Task.fetch(function(err,tasks){
		if(err){
			console.log(err)
		}
		Task
			.find({})
			.populate('commitId','userName')
			.exec(function(err, tasks){
				var _tasks=[];
				for(var i in tasks){
					var subTask=[tasks[i].name, tasks[i].commitId.userName, tasks[i].meta.startAt, tasks[i].meta.endAt, 'In Progress', 'log']
					_tasks.push(subTask)
				}
				console.log(tasks)
				res.send(_tasks)
			})
	})
}

exports.addTask = function(req,res){
	//console.log(req)
	var _name = req.body.name;
	var _commitId=req.session.user._id;
	var task= new Task({
		name:_name,
		commitId:_commitId,
	})
	task.save(function(err,task){
		if(err){
			console.log(err)
		}
		task.commitId = req.session.user.userName
		var node = [task.name, req.session.user.userName, moment(task.meta.startAt).format('MM/DD/YYYY'),moment(task.meta.endAt).format('MM/DD/YYYY'),'In Progress','report' ]
	    res.send(node)
	})
}