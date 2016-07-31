window.onload=drag;

function drag(){
	//drag login pannel
			var title=document.getElementsByClassName("title")[0],
				loginPanel=document.getElementsByClassName("loginPanel")[0],
				close=document.getElementById("ui_boxyClose"),
				loginStatus=document.getElementById("status");
	
			title.onmousedown=mDown;
			close.onclick=function(){
				loginPanel.style.display="none";
			}

	//switch login status
			loginStatus.onclick=switchStatus;


}


function mDown(e){
	var loginPanel=document.getElementsByClassName("loginPanel")[0];
		disLeft=e.clientX-loginPanel.offsetLeft,
		disTop=e.clientY-loginPanel.offsetTop;

		this.style.cursor="move";

		document.onmousemove=function(e){
			e=e||window.event;
			mMove(e,disLeft,disTop);
		}

		document.onmouseup=mUp;
}

function mMove(e,disLeft,disTop){
	var loginPanel=document.getElementsByClassName("loginPanel")[0];
	var tx=e.clientX-disLeft,
		ty=e.clientY-disTop;
			//limit horizontal area		
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

function mUp(){
	document.onmousemove=null;
	document.onmouseup=null;
}

//鼠标滑过点击登陆状态列表
function switchStatus(e){
	var statusList=document.getElementById("statusList"),
		listItem=statusList.getElementsByTagName("li"),
		status=document.getElementById("status");


	statusList.style.display="block";

	e.stopPropagation();

	for (var i=0; i<listItem.length;i++){
		listItem[i].onmousemove=function(){
			this.style.background="#ccc";
		}
		listItem[i].onmouseout=function(){
			this.style.background="#fff"
		}
		listItem[i].onclick=function(){
			status.innerText=this.innerText;
		}
	}
	document.onclick=function(){
		statusList.style.display="none";
	};
}