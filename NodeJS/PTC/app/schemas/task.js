var mongoose = require('mongoose')
var Schema = mongoose.Schema
var ObjectId = Schema.Types.ObjectId

var TaskSchema = new Schema({
	name: String,
	commitId: {type: ObjectId, ref:'User'},
	meta: {
		startAt: {
			type: Date,
			default: Date.now()
		},
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
		return this.find({}).sort('meta.startAt').exec(cb);
	},
	findById: function(id,cb){
		return this.findOne({_id:id}).exec(cb);
	}
}
module.exports = TaskSchema

//task document pre save check
// TaskSchema.pre('save',function(next){
// 	if (this.isNew){
// 		this.meta.createAt = this.meta.updateAt = Date.now();
// 	}else{
// 		this.meta.updateAt = Date.now()
// 	}
// 	next()
// })
