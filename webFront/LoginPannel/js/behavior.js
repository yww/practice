window.onload=drag;

//Functions
function drag(){
	var title=document.getElementsByClassName("title")[0],
		loginPanel=document.getElementsByClassName("loginPanel")[0];
		title.onmousedown=function mDown(e){
	//Distance of click point to the border of login panel
			var disLeft=e.clientX-loginPanel.offsetLeft,
				disTop=e.clientY-loginPanel.offsetTop;

				this.style.cursor="move";
				document.onmousemove=function mMove(e){
			//target coordinate of login pannel
					var tx=e.clientX-disLeft,
						ty=e.clientY-disTop;
			
			//limite horizontal area
					if(tx<0){
						tx=0;
					}else if(window.innerWidth-tx<loginPanel.offsetWidth){
							tx=window.innerWidth-loginPanel.offsetWidth;
					}else{
						tx=tx+'px';
					}
			//limite the vertical area		
					if(ty<0){
						ty=0;
					}else if(window.innerHeight-ty<loginPanel.offsetHeight){
							tx=window.innerHeight-loginPanel.offsetHeight;
					}else{
						ty=ty+'px';
					}

						loginPanel.style.left=tx;
						loginPanel.style.top=ty;
				}
				document.onmouseup=function mUp(){
					document.onmousemove=null;
					document.onmouseup=null;
				}
	}
				var close=document.getElementById("close");
				close.onclick=function(){loginPanel.style.display="none"}
}



