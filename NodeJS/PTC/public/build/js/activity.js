$(document).ready(function(){
	$.ajax({
		type: 'GET',
		url: '/activity',
	}).done(function(activities){
		activities.forEach(function(A){
			var _element = $('<li>').html(
				'<div class="block"><div class="block_content"><div class="byline"> <span>'+A.meta.createAt+'</span> by <a>'+A.user.userName+'</a></div> <h2 class="title"> '+A.action+' test <a class="blue" href="http://'+document.location.host+ '/test.html?testId='+A.target._id+'">'+A.target.testName+'</a> (<span>'+A.config.users+'</span> virtual users)</h2></div></div>')
			$('.list-unstyled').append(_element)
		})
	})	
	//console.log(activities)
})
