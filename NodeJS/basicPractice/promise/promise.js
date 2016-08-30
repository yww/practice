var Promise=window.Promise;

		var ball1=document.getElementsByClassName("ball1")[0];
		var ball2=document.getElementsByClassName("ball2")[0];
		var ball3=document.getElementsByClassName("ball3")[0];

		function promiseAnimate(ball, distance){
			return new Promise(function(resolve,reject){

				function _animate(){
				setTimeout(function(){
					var marginLeft=parseInt(ball.style.marginLeft,10);

					if(marginLeft==distance){
						resolve();
					}else{
						if(marginLeft<distance){
							marginLeft++;
						}else{
							marginLeft--;
						}
						ball.style.marginLeft=marginLeft;	
						_animate();			
					}
				
				},13)
			}
				_animate();
			})
		}

			

		promiseAnimate(ball1,100)
			.then(function(){
				return promiseAnimate(ball2,200)
			})
			.then(function(){
				return promiseAnimate(ball3,300)
			})
			.then(function(){
				return promiseAnimate(ball3,150)
			})
			.then(function(){
				return promiseAnimate(ball2,150)
			})
			.then(function(){
				return promiseAnimate(ball1,150)
			})
