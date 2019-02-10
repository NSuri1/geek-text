import mongoose from 'mongoose';

const ObjectId = mongoose.Schema.Types.ObjectId;

const schema = new mongoose.Schema({
	genre_id: ObjectId,
	name: {	type: String, index: true, unique: true, required: true},
	description: { type: String }
});

export default mongoose.model('Genre', schema);
