var mongoose = require('mongoose');
var bcrypt = require('bcryptjs');
var SALT_WORK_FACTOR = 10;

var UserSchema = new mongoose.Schema({
	name:{
		unique: true,
		type: String
	},
	password: String,
	//0: normal user; Verify; 2: super user 3-9? >50 super admin
	role: {
		type: Number,
		default: 0
	},
	meta: {
		createAt:{
			type: Date,
			default: Date.now()
		},
		updateAt:{
			type: Date,
			default: Date.now()
		},
	}
})

UserSchema.methods={
	comparePassword: function(_password,cb){
		bcrypt.compare(_password, this.password, function(err, isMatch){
			if(err){
				return cb(err);
			}
			cb(null, isMatch)
		})
	}
}

// execute function before saving data to database
UserSchema.pre('save',function(next){
	var user = this;
	if (this.isNew){
		this.meta.createAt = this.meta.updateAt = Date.now();
	}else{
		this.meta.updateAt = Date.now();
	}
	
	bcrypt.genSalt(SALT_WORK_FACTOR,function(err,salt){
		if (err) return next(err);

		bcrypt.hash(user.password,salt,function(err, hash){
			if(err) return next(err);
			user.password=hash;
			next()
		})
	})
})

UserSchema.statics={
	fetch: function(cb){
		return this.find({}).sort('meta.updateAt').exec(cb);
	},
	findById: function(id,cb){
		return this.findOne({_id:id}).exec(cb);
	}
}
module.exports = UserSchema

