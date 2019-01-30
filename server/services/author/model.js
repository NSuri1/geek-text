import mongoose from 'mongoose';
const ObjectId = mongoose.Schema.Types.ObjectId;

const schema = new mongoose.Schema({
    author_id: ObjectId,
    name: { type: String, required: true },
    bio: { type: String },
    headshot: { type: ObjectId, ref: 'Media' },
    books: [{ type: ObjectId, ref: 'Book' }]
});

export default mongoose.model('Author', schema);
