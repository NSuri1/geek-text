import mongoose from 'mongoose';

const ObjectId = mongoose.Schema.Types.ObjectId;

const schema = new mongoose.Schema({
	book_list_id: ObjectId,
	owner: {type: ObjectId, ref: 'User'},
	name: {type: String, required: true},
	books: [{type: ObjectId, ref: 'Book'}],
});

export default mongoose.model('BookList', schema);
