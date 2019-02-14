import mongoose from 'mongoose';

const ObjectId = mongoose.Schema.Types.ObjectId;

const schema = new mongoose.Schema({
	credit_card_id: ObjectId,
	card_number: {type: String, required: true},
	name_on_card: {type: String, required: true},
	expiration_date: {type: Date, required: true},
	ccv: {type: String, required: true},
});

export default mongoose.model('CreditCard', schema);
