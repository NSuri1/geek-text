import mongoose from 'mongoose';

const ObjectId = mongoose.Schema.Types.ObjectId;

const schema = new mongoose.Schema({
	user_address_id: ObjectId,
	street: {type: String, required: true},
	city: {type: String, required: true},
	state: {type: String, required: true},
	zip: {type: String, required: true},
	country: {type: String, required: true},
	time_zone: [{type: String, required: true, enum: ['HST', 'AKST', 'PST', 'MST', 'CST', 'EST']}],
});

export default mongoose.model('Address', schema);
