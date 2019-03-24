import Validator from 'validator';
import isEmpty from 'is-empty';

module.exports = function validateRegisterInput(data) {
  
	var errors = {};
	const upperCase = new RegExp('(?=.*[A-Z])');
	const number = new RegExp('(?=.*[0-9])');
	const special = new RegExp('(?=.*[!@#\$%\^&\*])');

	// Convert empty fields to an empty string so we can use validator functions
	data.username = !isEmpty(data.username) ? data.username : '';
	data.password = !isEmpty(data.password) ? data.password : '';
	data.first_name = !isEmpty(data.first_name) ? data.first_name : '';
	data.last_name = !isEmpty(data.last_name) ? data.last_name : '';
	data.email = !isEmpty(data.email) ? data.email : '';

	// Username checks
	if (Validator.isEmpty(data.username)) {
		errors.username = 'Username field is required';
	}

	// Password checks

	if (Validator.isEmpty(data.password)) {
		errors.password = ['Password field is required'];
	}
	else {
		if(data.password.length < 6) {
			if(!errors.password) {
				errors.password = [];
			}	
			errors.password.push('Must be at least 6 characters long');		
		}
		if(!upperCase.test(data.password)) {
			if(!errors.password) {
				errors.password = [];
			}
			errors.password.push('Must contain at least 1 uppercase letter');
		}
		if(!number.test(data.password)) {
			if(!errors.password) {
				errors.password = [];
			}
			errors.password.push('Must contain at least 1 number');
		}
		if(!special.test(data.password)) {
			if(!errors.password) {
				errors.password = [];
			}
			errors.password.push('Must contain at least one special character');
		}
	}


	// First Name checks
	if (Validator.isEmpty(data.first_name)) {
		errors.first_name = 'First Name field is required';
	}

	// Last Name checks
	if (Validator.isEmpty(data.last_name)) {
		errors.last_name = 'Last Name field is required';
	}

	// Email checks
	if (Validator.isEmpty(data.email)) {
		errors.email = 'Email field is required';
	}
	else if (!Validator.isEmail(data.email)) {
		errors.email = 'Invalid Email';
	}

	return {
		errors,
		isValid: isEmpty(errors)
	};
};
