import mongoose from 'mongoose';
const ObjectId = mongoose.Schema.Types.ObjectId;

const subschema = new mongoose.Schema({
  shopping_cart_item_id: ObjectId,
  book_id: { type: ObjectId, ref: 'Book' },
  price: { type: Number, min: 0.0, required: true },
  quantity: { type: Number, default: 1 },
  saved_for_later: { type: Boolean, default: false }
});

const schema = new mongoose.Schema({
  shopping_cart_id: ObjectId,
  user_id: { type: ObjectId, ref: 'User' },
  books: [subschema]
});

export default mongoose.model('ShoppingCart', schema);
