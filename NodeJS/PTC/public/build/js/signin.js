$(document).ready(function(){
            $("#sigin").submit(function(event){
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