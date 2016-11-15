//used by tests page
$(document).ready(function(){
	$.ajax({
		type: 'GET',
		url: '/test/'+document.location.search
	}).done(function(_tests){
		$('#tabelWrap').html('<table id="datatable3" class="table table-striped dataTable no-footer" role="grid" aria-describedby="datatable_info"></table>')
		$('#datatable3').dataTable({
			"aaData": _tests,
			"aoColumns": [
			{"sTitle": "test name",
				"render": function(test){
						return '<a class="blue" href="http://'+ document.location.host+'/test.html?testId='+ test.id + '">' + test.name +'</a>'
					}
				},
			{"sTitle": "Owner"},
			//{"sTitle": "Type"},
			{"sTitle": "Users"},
			{"sTitle": "Created At"}
			]
		})
	})
})
