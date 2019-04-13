import mongoose from 'mongoose';

const ObjectId = mongoose.Schema.Types.ObjectId;

const schema = new mongoose.Schema({
	user_id: ObjectId,
	username: { type: String, index: true, unique: true, required: true },
	password: { type: String, minlength: 6, required: true },
	first_name: { type: String, required: true },
	last_name: { type: String, required: true },
	nickname: { type: String },
	email: { type: String, unique: true, required: true },
	address: { type: ObjectId, ref: 'Address' },
	shipping_addresses: [{ type: ObjectId, ref: 'Address' }],
	shopping_cart_id: { type: ObjectId, required: true },
	credit_cards: [{ type: ObjectId, ref: 'CreditCard' }]
});

export default mongoose.model('User', schema);
