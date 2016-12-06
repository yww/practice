//session
$(document).ready(function(){
    $.ajax({
        type: 'GET',
        url: '/session/user'
    }).done(function(results){
       // console.log(results)
        if(results.name){
            var users = $('.currentUser')
            for(i in users){
                users[i].innerText=results.name
            }
        }else{
            window.location.pathname="/login.html"
        }
    })
})

