import Validator from 'validator';
import isEmpty from 'is-empty';
import { type } from 'os';


module.exports = function validateCreateInput(data) {
    
	let errors = {};

	// Convert empty fields to an empty string so we can use validator functions
	data.card_number = !isEmpty(data.card_number) ? data.card_number.trim() : '';
	data.name_on_card = !isEmpty(data.name_on_card) ? data.name_on_card : '';
	data.expiration_date = !isEmpty(data.expiration_date) ? data.expiration_date.trim() : '';
	data.ccv = !isEmpty(data.ccv) ? data.ccv.trim() : '';
	

	// Check that the Card number field is not empty (else) check it is a valid credit card
	if (Validator.isEmpty(data.card_number)) {
		errors.card_number = 'Card number is required';
	} 
	else {
		data.card_number = data.card_number.replace(/ /g,'')
		
		if (!Validator.isCreditCard(data.card_number)) {
			errors.card_number = 'Invalid credit card'
		}

	}
	

	// Name on card checks
	if (Validator.isEmpty(data.name_on_card)) {
		errors.name_on_card = 'Name on card is required';
	}
	
	// Check if Expiration date is empty (else) check that format is valid
	if (Validator.isEmpty(data.expiration_date)) {
		errors.expiration_date = 'Expiration date is required';
	}
	else {

		if(data.expiration_date.length < 7 || /\s/.test(data.expiration_date)) {
			errors.expiration_date = "Invalid expiration date. must be of format xx/xxxx"
		}
		else {

			let date = data.expiration_date.split('/') 
			let month = Validator.toInt(date[0])
			let year = Validator.toInt(date[1])

			let currentDate = new Date();
			let inputDate = new Date(year, (month - 1))

			if(month < 1 || month > 12) {
				errors.expiration_date = "Invalid month. Must be bewteen 01 and 12"
			}

			if(inputDate < currentDate) {
				errors.expiration_date = "Expired card"
			}

		}

	}

	// Check if CCV field is empty (else) check if no less than 3 digits
	if (Validator.isEmpty(data.ccv)) {
		errors.ccv = 'CCV / CVV field is required';
	}
	else {

		if(data.ccv.length < 3 ) {
			errors.ccv = "CCV / CVV cannot be less than 3 digits"
		}

		if(/\s/.test(data.ccv)) {
			errors.ccv = "Invalid ccv"
		}

	}
	
	return {
		errors,
		isValid: isEmpty(errors)
	};
};