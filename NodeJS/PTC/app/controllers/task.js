var Task = require('../models/task');
var app = require('../../app')
var _ = require('underscore');
var moment = require('moment')


exports.getAllTask = function(req, res){
		Task
			.find({})
			.populate('commitId','userName')
			.populate('status','status')
			.exec(function(err, tasks){
				var _tasks=[];
				for(var i in tasks){
					var subTask=[tasks[i].name, tasks[i].commitId.userName, moment(tasks[i].meta.recordAt).format('yyyy/MM/dd HH:mm:ss'), moment(tasks[i].meta.endAt).format('yyyy/MM/dd HH:mm:ss'), 'In Progress', 'log']
					_tasks.push(subTask)
				}
				console.log(tasks)
				res.send(_tasks)
			})
}

exports.addTask = function(req,res){
	var id = req.body._id;
	var taskObj = req.body.task;
	var _task;

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
			var node = [task.name, req.session.user.userName, moment(task.meta.recordAt).format('yyyy/MM/dd HH:mm:ss'),moment(task.meta.endAt).format('yyyy/MM/dd HH:mm:ss'),'In Progress','report' ]
		    res.send(node)
		})
}

//upload a new case
exports.uploadCase= function(){

}


