import Validator from 'validator';
import isEmpty from 'is-empty';


module.exports = function validateCreateInput(data) {
    
	let errors = {};

	// Convert empty fields to an empty string so we can use validator functions
	data.address_line1 = !isEmpty(data.address_line1) ? data.address_line1 : '';
	data.city = !isEmpty(data.city) ? data.city : '';
	data.state = !isEmpty(data.state) ? data.state : '';
	data.zip = !isEmpty(data.zip) ? data.zip : '';
	data.country = !isEmpty(data.country) ? data.country : '';
	

	// Address line 1 checks
	if (Validator.isEmpty(data.address_line1)) {
		errors.address_line1 = 'Address line 1 is required';
	} 
	

	// City checks
	if (Validator.isEmpty(data.city)) {
		errors.city = 'City field is required';
	}
	
	// State checks
	if (Validator.isEmpty(data.state)) {
		errors.state = 'State field is required';
	}

	// Zip checks
	if (Validator.isEmpty(data.zip)) {
		errors.zip = 'Zip field is required';
	}

	// Country checks
	if (Validator.isEmpty(data.country)) {
		errors.country = 'Country field is required';
	}

	return {
		errors,
		isValid: isEmpty(errors)
	};
};