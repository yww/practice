//pureJS.js uses troditional callback way to control animation process

	var ball1=document.getElementsByClassName("ball1")[0];
	var ball2=document.getElementsByClassName("ball2")[0];
	var ball3=document.getElementsByClassName("ball3")[0];

	function animate(ball, distance,cb){
		setTimeout(function(){
			var marginLeft=parseInt(ball.style.marginLeft,10);

			if(marginLeft==distance){
				if(cb){
					cb();
				}
			}else{
				if(marginLeft<distance){
					marginLeft++;
				}else{
					marginLeft--;
				}
				ball.style.marginLeft=marginLeft;	
				animate(ball,distance,cb);			
			}
		
		},13);
	}

	animate(ball1,100,function(){
		animate(ball2,200,function(){
			animate(ball3,300,function(){
				animate(ball3,150,function(){
					animate(ball2,150,function(){
						animate(ball1,150,function(){
							//
						})
					})
				})
			})
		});
	})
