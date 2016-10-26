$(document).ready(function(){
	$.ajax({
		type: 'GET',
		url: '/getAllTask'
	}).done(function(_tasks){
		$('#tabelWrap').html('<table id="datatable2" class="table table-striped table-bordered dataTable no-footer" role="grid" aria-describedby="datatable_info"></table>')
		$('#datatable2').dataTable({
			"aaData": _tasks,
			"aoColumns": [
			{"sTitle": "Case"},
			{"sTitle": "Commit By"},
			{"sTitle": "StartTime"},
			{"sTitle": "End Time"},
			{"sTitle": "Status"},
			{"sTitle": "Report",
				"render": function(Id){
					return '<a class="blue" href="http://'+Id+'/dashboard">log</a>'
					}
				}
			]
		})
	})
})

function getConfiguration(){
	var configList=["caseName","overideHost","overideRampup","overideIteration","overideDuration","overideUser"]
	var config={}

	for (i in configList){
		var configValue=$("#"+configList[i]+"[disabled!=disabled]").val();
	   	if(configValue){
	   		config[configList[i]]=configValue
	   }
	}	
	return config;
}


$(document).ready(function(){
	$('#startTest').click(function(){
		$.ajax({
			contentType: 'application/json',
			type: 'POST',
			url: '/addTask',
			data:JSON.stringify({name:$("#heard").attr('selected', true).val()})
		}).done(function(task){
			//console.log(task)
			$('#datatable2').dataTable().fnAddData(task)
		})
	})
})


