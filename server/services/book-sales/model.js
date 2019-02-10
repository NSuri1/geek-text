import mongoose from 'mongoose';

const ObjectId = mongoose.Schema.Types.ObjectId;

const schema = new mongoose.Schema({
	book_sales_id: ObjectId,
	book: {type: ObjectId, ref: 'Book'},
	total_sold: {type: Number, default: 0.0}
});

export default mongoose.model('BookSales', schema);
