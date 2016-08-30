var fs=require('fs');

fs.readFile('logo.png',function(err,origin_buffer){
	//console.log(Buffer.isBuffer(origin_buffer))
	fs.writeFile('logo_buffer.png',origin_buffer,function(err){
		if(err){
			console.log(err);
		}
	})

	var base64Image = origin_buffer.toString('base64');
	fs.writeFile('base64.txt',base64Image,function(err){
		if(err){
			console.log(err);
		}
	});

	var decodeImage=new Buffer(base64Image,'base64');
	console.log(Buffer.compare(origin_buffer,decodeImage));
	fs.writeFile('logo_decode.png',decodeImage,function(err){
		if(err){
			console.log(err)}
	})
})
