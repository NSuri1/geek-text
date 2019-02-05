import ShoppingCart from './model';
import {Severity, log} from '../../utils/logger';

const create = (cart, callback) => {
	ShoppingCart.create(cart, (error, created) => {
		if (error) log(error.message, Severity.Error);
		if (callback) callback(error ? null : created);
	});
};

const update = (id, updates, callback) => {
	ShoppingCart.findByIdAndUpdate(id, {$set: updates}, {new: true}, (error, updated) => {
		if (error) log(error.message, Severity.Error);
		if (callback) callback(error ? null : updated);
	});
};

const fetchAll = (callback) => {
	ShoppingCart.find({}, (error, carts) => {
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
