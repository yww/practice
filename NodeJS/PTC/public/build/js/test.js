$(document).ready(function(){
	$.ajax({
		type: 'GET',
		url: '/task/'+document.location.search
	}).done(function(_tasks){
		$('#tabelWrap').html('<table id="datatable4" class="table table-striped dataTable no-footer" role="grid" aria-describedby="datatable_info"></table>')
		$('#datatable4').dataTable({
			"aaData": _tasks,
			"aoColumns": [
			{"sTitle": "test name",
				"render": function(task){
					return '<a class="blue" href="http://'+ document.location.host+'/report.html?taskId='+ task.id + '">' + task.name +'</a>'
				//	return '<a class="blue" href="http://'+project.id+'">'+project.name+'</a>'
				}
			},
			{"sTitle": "Users"},
			{"sTitle": "Created At"}
			]
		})
	})
})
