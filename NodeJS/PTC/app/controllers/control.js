//Task control. Start/Monitor/Kill JMeter, update database status
var fs = require('fs')
var simpleSSH = require('simple-ssh')
var Task = require('../models/task')
var app = require('../../app')

var moment = require('moment')

//new SSH connection
var ssh = new SSH({
    host: 'localhost',
    user: 'username',
    pass: 'password'
})

//read configuration from config file 
// ...

exports.startTask = function(case){
	ssh.exec('jmeter -n -t' + <case> +' -l' + <test log file> +' -e -o '+ <Path to output folder> & echo $!,{out: function(pId){
		var _pId = parseInt(pId)
		console.log(pId)
		}}).start()
	}


exports.queryStatus = function(pid){
	ssh
	.exec('ps -p '+pid+' -o s=',{out:function(result){
		console.log(result)}})
	.exec('ps -p '+pid+' -o stime=',{out:function(result){
		console.log(result)}})
	.start()
}

exports.killTask = function(pid){
	ssh
	.exec('kill -9 '+pid,{out:function(result){
		console.log(result)
	}}
}

exports.copyFile = function(pid){
	//copy file from target machine
}

// Below functions will be invoked in interval loop 

// if there are pending tasks, execute it accordingly Status: 1 pending, 2 running, 3 finished, 4 killed, 5 unknown
exports.execTask = function(){
	var runningTasks = Task.find('status':2).count()
	var maxConTasks = fs.read().
	//read maximum concurrency number from config file
	if(runningTasks && runningTasks<5){
		Tasks
		.find('status':1)
		.sort({meta.recordAt:'desc'})
		.limit(1)
		.exec(function(err, task){
			this.status=2
			this.save(function(err,task){
				if(err){console.log(err)}

			})
			startTask(this.name)
		})
	}else{
		return
	}
}

//kill expired tasks
exports.killExpired = function(){
	//read maximum duration time from config file
	var maxDurTime = ???
	Tasks
	.find({'status':1})
	.exec(function(err,tasks){
		for(var i in tasks){
			var duration = Date.now()-tasks[i].meta.startAt

			if(duration>=maxDurTime){
				tasks[i].status = 4
				killTask(tasks[i].pid)
			}
		}
	})
}

//copy logs. To copy logs from target machine to localhost
exports.parseLog = function(){
	Task
	.find({'status':3 'logFile':false})
	.exec(function(err, tasks){
		if(err){
			return console.log(err)
		}else{
			for(i in tasks){
				copyFile(tasks[i].pid)
			}
		}
	})
}


