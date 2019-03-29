import CreditCard from './model';
import {Severity, log} from '../../utils/logger';

const create = (card, callback) => {
	CreditCard.create(card, (error, created) => {
		if (error) log(error.message, Severity.Error);
		if (callback) callback(error ? null : created);
	});
};

const update = (id, updates, callback) => {
	CreditCard.findByIdAndUpdate(id, {$set: updates}, {new: true}, (error, updated) => {
		if (error) log(error.message, Severity.Error);
		if (callback) callback(error ? null : updated);
	});
};

const removeById = (id, callback) => {
	CreditCard.deleteOne({_id : id}, (error, updated) => {
		if (error) log(error.message, Severity.Error);
		if (callback) callback(error ? null : updated);
	});
};

const fetchAll = (query, callback) => {
	CreditCard.find(query, (error, cards) => {
		if (error) log(error.message, Severity.Error);
		if (callback) callback(error ? null : cards);
	});
};

const fetchById = (id, callback) => {
	CreditCard.findById(id, (error, creditCard) => {
		if (error) log(error.message, Severity.Error);
		if (callback) callback(error ? null : creditCard);
	});
};

export default {
	create, update, removeById, fetchAll, fetchById,
};
