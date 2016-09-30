//Task control. Start/Monitor/Kill JMeter, update database status
var fs = require('fs')
var SSH = require('simple-ssh')
var Task = require('../models/task')

var moment = require('moment')


//Read confirguration from config.json
var configObj = JSON.parse(fs.readFileSync('./config/config.json', 'utf8'))

//new SSH connection
var SSHObj = {
    host: configObj.targetMachine.host,
    user: configObj.targetMachine.user,
    pass: configObj.targetMachine.pass
}

exports.startTask = function(doc){

	ssh.exec('jmeter -n -t' + _doc.name +' -l' + '<test log file>' +' -e -o '+ '<Path to output folder>' + ' & echo $!',{out: function(pId){
		
		doc.pId = parseInt(pId)
		doc.save(function(err, doc){
			if (err){
				console.log(err)
			} 
		})
		}}).start()
	}

exports.killTask = function(pid){
	ssh
	.exec('kill -9 '+pid,{out:function(result){
		console.log(result)
	}}).start()
}

exports.copyFile = function(pid){
	//copy file from target machine
}


// Below functions will be invoked in interval loop 

// if there are pending tasks, execute it accordingly Status: 1 pending, 2 running, 3 finished, 4 killed, 5 unknown
exports.execTask = function(){

	var runningTasks = Task.find({status:2}).count();
	var maxConTasks = configObj.maxConTasks;
	var maxConTasks = configObj.maxConTasks

	if(runningTasks<maxConTasks){
		console.log('execTask...')
		Task
		.find({status:1})
		.sort({'meta.recordAt':'desc'})
		.limit(1)
		.exec(function(err, tasks){
			var _task = tasks[0]
			_task.status=2
			_task.save(function(err,task){
				if(err){console.log(err)}
				startTask(_task)
			})
		})
	}else{
		return
	}
}

//Finish task
exports.FinishTask = function(){
	Task
	.find({status:2})
	.exce(
		function(err, tasks){
			if(err){
				console.log(err)
			}
			for(i in tasks){
				var ssh = new SSH(SSHObj)
				ssh
				.exec('ps -p '+tasks[i].pid+' -o s=',{out:function(result){
				if(!result){
					task[i].status = 3
				}
			}}).start()
			}
		}
	)
}

//kill expired tasks
exports.killExpired = function(){
	//read maximum duration time from config file
	var maxDurTime = configObj.maxDurTime
	Task
	.find({status:2})
	.exec(function(err,tasks){
		for(var i in tasks){
			var duration = Date.now()-tasks[i].meta.startAt
			console.log(duration)

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
	.find({status:3, logFile: false})
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


//for Debug
exports.debug = function(doc){
	var Test = test;
	var ssh = new SSH(SSHObj)
	ssh.exec('nohup sleep 10 & echo $!',{out:function(result){
		var pid = parseInt(result)
		console.log(pid)
		doc.status = 'TEST'
		doc.save()
	}}).start()
}
