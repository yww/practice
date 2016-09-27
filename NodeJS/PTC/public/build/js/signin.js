$(document).ready(function(){
   //login request 
    $('#login').submit(function(e){

        $.ajax({
            type: "POST",
            url: "/signin",
            data: $(this).serialize(),
            success: function(results){
                if(results.code ===200){
                    alert(results.msg)
                    document.location.pathname= '/'
                }else{
                    alert("ERROR: "+ results.msg)
                }
            }
        })
        return e.preventDefault()
    })
})

$(document).ready(function(){
    //signup request
     $('#register').submit(function(e){

        $.ajax({
            type: "POST",
            url: "/signup",
            data: $(this).serialize(),
            success: function(results){
                if(results.code===201){
                    alert(results.msg)
                    document.location.hash=''
                }else{
                    alert(results.msg)
                }
            }
        })
        return e.preventDefault()
    })    
})