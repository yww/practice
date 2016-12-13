//Task control. Start/Monitor/Kill JMeter, update database status
var fs = require('fs')
var SSH = require('simple-ssh')
var Task = require('../models/task')
var Test = require('../models/test')
var Config = require('../models/config')

var moment = require('moment')


//Read confirguration from config.json
var configObj = JSON.parse(fs.readFileSync(__dirname + '/../../config/config.json', 'utf8'))

//new SSH connection
var SSHObj = {
    host: configObj.targetMachine.host,
    user: configObj.targetMachine.user,
    pass: configObj.targetMachine.pass
}

function startTask(doc){
	
	var name
	var id=doc._doc._id
	var configString=" "
	var configItems=['host','users','rampup','iteration']
	
	Test
	.findById(doc.testId,function(err,test){
		name=test._doc.caseName
	})

	Config
	.findById(doc.configId,function(err,config){
		configItems.forEach(function(c){
			if(config._doc[c]){
				configString += '-J'+c+'='+config[c]+' '
			}
		})

	var ssh = new SSH(SSHObj)	
	ssh
	.exec(' bash /usr/PTC/start.sh ' + id + ' ' + name + configString,{
		out: function(pId){
		if(pId){
			doc.status=2
			doc.pId = parseInt(pId)
			doc.meta.startAt = Date.now()
			doc.save(function(err, doc){
					if (err){
						console.log(err)
					} 
				})
			}},
		exit: function(code){
			//retry 10 times, if task still can't be executed successfully, set status to 5 unknown
			if(doc.retry < 10){
				// console.log(doc.retry)
				doc.retry+=1
				doc.save()
			}else{
				doc.status = 5
				doc.meta.endAt = Date.now()
				doc.save(function(err, doc){
					console.log('start task failed, error code is: ')
					console.log(code)
				})
			}
		}	
		}).start()
	})				
}



function killTask(doc){
	var ssh = new SSH(SSHObj)
	ssh
	.exec('kill -9 '+doc.pId,{
		exit: function(code){
			if(code ===1){
				doc.status = 5
				doc.meta.endAt = Date.now()
				doc.save()
			}else{
				doc.meta.endAt = Date.now()
				doc.save()
			}
		},
		out:function(result){
			console.log('time\'s up, kill task' )
			doc.meta.endAt = Date.now()
			doc.save()
	}}).start()
}

// Below functions will be invoked in interval loop 

// if there are pending tasks, execute it accordingly Status: 1 pending, 2 running, 3 finished, 4 killed, 5 unknown
exports.execTask = function(){

	var runningTasks;
	Task.find({status:2}).count(function(err,count){
		if(err){
			console.log(err)
		}else{
			runningTasks=count
				var maxConTasks = configObj.maxConTasks;
			if(runningTasks<maxConTasks){
				Task
				.find({status:1})
				.sort({'meta.recordAt':'desc'})
				.limit(1)
				.exec(function(err, tasks){
					var _task = tasks[0]
					if(_task){
						startTask(_task)		
					}
				})
			}else{
				return
			}
		}
	})
}

//Finish task
exports.FinishTask = function(){
	Task
	.find({status:2})
	.exec(
		function(err, tasks){
			if(err){
				console.log(err)
			}
			tasks.forEach(function(t) {
				if(t.pId){
					var ssh = new SSH(SSHObj)
					ssh
					.exec('ps -p '+t.pId+' -o s=',{
						exit: function(code) {
							if (code === 1) {
								//console.log('exit code ==1, PID does\'t exist. Task has finished')
								t.status = 3
								t.meta.endAt = Date.now()
								t.save()
							}		
						},
						out: function(result){
							// console.log('task is still running')
							// console.log(result)
						}
					}).start()					
				}
			})
		}
	)
}

//kill expired tasks
exports.killExpired = function(){
	//read maximum duration (min *60*1000-> s) time from config file
	//var maxDurTime = configObj.maxDurTime*60*1000
	Task
	.find({status:2})
	.exec(
		function(err,tasks){
			if(err){
				console.log(err)
			}
			tasks.forEach(function(t){
				Config
				.findById(t.configId,function(err,config){
					var duration = Date.now()-t.meta.startAt.getTime()
					if(duration>=config.duration*60*1000){
						t.status = 4
						t.save(function(err){
							if(err){
								console.log(err)
							}
							killTask(t)
						})
					}				
				})
			})
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

