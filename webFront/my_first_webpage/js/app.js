window.onload=start;

function start(){
	//头部效果
	var nav=document.getElementsByClassName("header")[0];
	var list=nav.getElementsByTagName("li")

	for(var i=0;i<list.length;i++){
		list[i].onclick=click;
	}

	//滚动新闻开始
	setInterval(scroll,300);

	

}

function click(){
	var nav=document.getElementsByClassName("header")[0];
	if (this.className=="active"){
		return
	}else{
		var oldActive=nav.getElementsByClassName("active")[0];
		oldActive.className="";
		this.className="active";
	}

}

function scroll(){
	var scrollNews=document.getElementsByClassName("newsRight")[0]
	var sHeight=scrollNews.scrollHeight;
	if(scrollNews.scrollTop>=sHeight-40){
		scrollNews.scrollTop=0;
	}else{
		scrollNews.scrollTop++;
	}

}