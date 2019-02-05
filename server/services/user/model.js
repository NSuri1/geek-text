import mongoose from 'mongoose';

const ObjectId = mongoose.Schema.Types.ObjectId;

const schema = new mongoose.Schema({
	user_id: ObjectId,
	username: {
		type: String, index: true, unique: true, required: true},
	password: {type: String, minlength: 6},
	name: {type: String, required: false},
	email: {type: String, required: true},
	address: {type: ObjectId, ref: 'UserAddress'},
	shipping_addresses: [{type: ObjectId, ref: 'UserAddress'}],
	credit_cards: [{type: ObjectId, ref: 'UserCreditCard'}],
});

export default mongoose.model('User', schema);
