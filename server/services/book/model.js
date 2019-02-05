import mongoose from 'mongoose';

const ObjectId = mongoose.Schema.Types.ObjectId;

const schema = new mongoose.Schema({
	book_id: ObjectId,
	title: {type: String, required: true},
	authors: [{type: ObjectId, ref: 'Author'}],
	genre: {type: String, required: true},
	description: {type: String, required: true},
	isbn13: {type: String, required: true},
	price: {type: Number, min: 0, required: true},
	cover_image: {type: ObjectId, ref: 'Media'},
	publisher: {type: String, required: true},
	published_on: {type: Date, required: true},
});

export default mongoose.model('Book', schema);
