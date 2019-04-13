import ShoppingCart from './model';
import { Severity, log } from '../../utils/logger';

const create = (cart, callback) => {
	ShoppingCart.create(cart, (error, created) => {
		if (error) log(error.message, Severity.Error);
		if (callback) callback(error ? null : created);
	});
};

const update = (id, updates, callback) => {
	// Convert the object to an array to easily parse data
	var result = Object.keys(updates).map(function (key) {
		return ([Number(key), updates[key]]);
	});

	var bookArray = []

	for (var i = 0; i < result.length; i += 5) {
		var book = {
			"shopping_cart_item_id": result[i][1],
			"book_id": result[i + 1][1],
			"price": result[i + 2][1],
			"quantity": result[i + 3][1],
			"saved_for_later": result[i + 4][1]
		}
		bookArray.push(book)
	}

	const formattedUpdate = {
		"books": bookArray
	}

	ShoppingCart.findByIdAndUpdate(id, { $set: formattedUpdate }, { new: true }, (error, updated) => {
		if (error) log(error.message, Severity.Error);
		if (callback) callback(error ? null : updated);
	});
};

const fetchAll = (query, callback) => {
	ShoppingCart.find(query, (error, carts) => {
		if (error) log(error.message, Severity.Error);
		if (callback) callback(error ? null : carts);
	});
};

const fetchById = (id, callback) => {
	ShoppingCart.findById(id, (error, shoppingCart) => {
		if (error) log(error.message, Severity.Error);
		if (callback) callback(error ? null : shoppingCart);
	});
};

export default {
	create, update, fetchAll, fetchById,
};
