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
TaskSchema.static={
	fetch: function(cb){
		return this.find({}).sort('meta.startAt').exec(cb)
	},
	findById: function(id, cb){
		return this.findOne({_id: id}).exec(cb)
	}
}
module.exports = TaskSchema