import mongoose from 'mongoose';

const ObjectId = mongoose.Schema.Types.ObjectId;

const schema = new mongoose.Schema({
	book_rating_id: ObjectId,
	user: { type: ObjectId, ref: 'User' },
	book: { type: ObjectId, ref: 'Book' },
	rating: { type: Number },
	comment: { type: String }
});

export default mongoose.model('BookRating', schema);
