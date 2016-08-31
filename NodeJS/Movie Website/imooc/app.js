var express=require('express');
var port= process.env.PORT || 3000;
var path = require('path');
var serveStatic=require('serve-static');
var bodyParser=require('body-parser');
var app = express();


app.set('views','./views/pages');
app.set('view engine','jade');
app.use(bodyParser({extended:true}));
app.use(serveStatic(path.join(__dirname,'library')));
app.listen(port);

console.log('imooc started on port'+port);

//index page
app.get('/',function(req,res){
	res.render('index',{
		title:'imooc 首页',
		movies:[{
			title:'机械战警',
			_id:1,
			poster:'http://r3.ykimg.com/05160000530EEB63675839160D0B79D5'
		},{
			title:'机械战警',
			_id:2,
			poster:'http://r3.ykimg.com/05160000530EEB63675839160D0B79D5'
		},{
			title:'机械战警',
			_id:3,
			poster:'http://r3.ykimg.com/05160000530EEB63675839160D0B79D5'
		},{
			title:'机械战警',
			_id:4,
			poster:'http://r3.ykimg.com/05160000530EEB63675839160D0B79D5'
		},{
			title:'机械战警',
			_id:5,
			poster:'http://r3.ykimg.com/05160000530EEB63675839160D0B79D5'
		},{
			title:'机械战警',
			_id:6,
			poster:'http://r3.ykimg.com/05160000530EEB63675839160D0B79D5'
		}]
	})
})

//detail page
app.get('/movie/:id',function(req,res){
	res.render('detail',{
	title:'imooc 详情页',
		movie:{
			director:'何塞',
			country:'美国',
			title:'机械战警',
			year:2014,
			poster:'http://r3.ykimg.com/05160000530EEB63675839160D0B79D5',
			language:'英语',
			flash:'http://player.youku.com/player.php/sid/XNjA1Njc0NTUy/v.swf',
			summary:'This is summary blablabla...'
		}
	})
})

//admin page
app.get('/admin/movie',function(req,res){
		res.render('admin',{
		title:'imooc 后台录入',
		movie:{
			title:'',
			direcotr:'',
			country:'',
			year:'',
			poster:'',
			flash:'',
			summary:'',
			language:''
		}
	})
})

//list page
app.get('/admin/list',function(req,res){
	res.render('list',{
		title:'imooc 列表页',
		movies:[{
			title:'机械战警',
			_id:1,
			director:'何塞',
			country:'美国',
			year:2014,
			poster:'http://r3.ykimg.com/05160000530EEB63675839160D0B79D5',
			language:'英语',
			flash:'http://player.youku.com/player.php/sid/XNjA1Njc0NTUy/v.swf',
			summary:'This is summary blablabla...'
		}]
	})
})