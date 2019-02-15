import mongoose from 'mongoose';

const ObjectId = mongoose.Schema.Types.ObjectId;

const schema = new mongoose.Schema({
	book_id: ObjectId,
	title: {type: String, required: true},
	authors: [{type: ObjectId, ref: 'Author'}],
	genre: {type: ObjectId, ref: 'Genre'},
	description: {type: String, required: true},
	isbn13: {type: String, required: true},
	price: {type: Number, min: 0, required: true},
	cover_image: {type: ObjectId, ref: 'Media'},
	rating: {type: Number, min: 0.0, max: 10.0, default: 0.0},
	publisher: {type: String, required: true},
	published_on: {type: Date, required: true},
});

export default mongoose.model('Book', schema);
