import Validator from 'validator';
import isEmpty from 'is-empty';

module.exports = function validateUpdateInput(data) {
  
    let errors = {};

    //card number validation
    if(data.card_number) {
        data.card_number = data.card_number.replace(/ /g,'');
		
		if (!Validator.isCreditCard(data.card_number)) {
			errors.card_number = 'Invalid credit card number';
		}
    }    
    
    //expiration date validation
    if(data.expiration_date) {
        if(data.expiration_date.length < 7 || /\s/.test(data.expiration_date)) {
			errors.expiration_date = 'Invalid expiration date. must be of format xx/xxxx';
		}
		else {

			let date = data.expiration_date.split('/'); 
			let month = Validator.toInt(date[0]);
			let year = Validator.toInt(date[1]);

			let currentDate = new Date();
			let inputDate = new Date(year, (month - 1));

			if(month < 1 || month > 12) {
				errors.expiration_date = 'Invalid month. Must be bewteen 01 and 12';
			}

			if(inputDate < currentDate) {
				errors.expiration_date = 'Expired card';
			}

		}
    } 

    //ccv validation
    if(data.ccv) {
        if(data.ccv.length < 3 ) {
			errors.ccv = 'CCV / CVV cannot be less than 3 digits';
		}

		if(/\s/.test(data.ccv)) {
			errors.ccv = 'Invalid ccv';
		}
    } 

    
    
    return {
		errors,
        isValid: isEmpty(errors)
	};
};