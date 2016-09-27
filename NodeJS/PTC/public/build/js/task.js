// $(document).ready(function(){
// 	$.ajax({
// 		type: 'GET',
// 		url: '/getAllCase'
// 	}).done(function(results){
// 		console.log(results)
// 	})
// })

$(document).ready(function(){
	$('#startTest').click(function(){
		$.ajax({
			contentType: 'application/json',
			type: 'POST',
			url: '/addTask',
			data:JSON.stringify({name:$("#heard").attr('selected', true).val()})
		}).done(function(){
			alert('success')
		})
	})
})


