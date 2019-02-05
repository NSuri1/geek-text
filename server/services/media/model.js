import mongoose from 'mongoose';

const ObjectId = mongoose.Schema.Types.ObjectId;

const schema = new mongoose.Schema({
	media_id: ObjectId,
	name: {type: String, required: true},
	type: {type: String, required: true},
	extension: {type: String, required: true},
	base64: {type: String, required: true},
});

export default mongoose.model('Media', schema);
