import mongoose from 'mongoose';

const ObjectId = mongoose.Schema.Types.ObjectId;

const schema = new mongoose.Schema({
	user_address_id: ObjectId,
	address_line1: {type: String, required: true},
	address_line2: {type: String, required: false},
	city: {type: String, required: true},
	state: {type: String, required: true},
	zip: {type: String, required: true},
	country: {type: String, required: true}
});

export default mongoose.model('Address', schema);
