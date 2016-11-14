$(document).ready(function(){
	showTests();
})

//show tests of particular project
function showTests(){
	$.ajax({
		type: 'GET',
		url: '/test/'+document.location.search
	}).done(function(_tests){
		$('#tabelWrap').html('<table id="datatable3" class="table table-striped table-bordered dataTable no-footer" role="grid" aria-describedby="datatable_info"></table>')
		$('#datatable3').dataTable({
			"aaData": _tests,
			"aoColumns": [
			{"sTitle": "test name"},
			{"sTitle": "Owner"},
			//{"sTitle": "Type"},
			{"sTitle": "Users"},
			{"sTitle": "Created At"}
			]
		})
	})
}