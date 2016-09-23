$(document).ready(function(){
            $("#login")[0].submit(function(event){
                event.preventDefault();
                alert('success')
                $.ajax({
                    type: "POST",
                    url: "/sigin"
                }).done(function(results){
                    if(results.error){
                        alert(results.error)
                    }
                })
            })
    }
)