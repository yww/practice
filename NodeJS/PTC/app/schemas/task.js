var mongoose = require('mongoose')
var Schema = mongoose.Schema
var ObjectId = Schema.Types.ObjectId

var TaskSchema = new Schema({
	name: String,
	commitId: {type: ObjectId, ref:'User'},
	pid: Number,
	logFile: Boolean,
	meta: {
		recordAt: {
			type: Date,
			default: Date.now()
		},
		startAt: Date,
		endAt: {
			type: Date,
			default: Date.now()
		}
	},
	status: String,
	log: String
})

//Method of model(tabel)

TaskSchema.statics={
	fetch: function(cb){
		return this.find({}).sort('meta.recordAt').exec(cb);
	},
	findById: function(id,cb){
		return this.findOne({_id:id}).exec(cb);
	}
}

//task document pre save check

TaskSchema.pre('save',function(next){
	if (this.isNew){
		this.meta.recordAt = this.meta.updateAt = Date.now();
	}else{
		this.meta.startAt = Date.now()
	}
	next()
})

module.exports = TaskSchema