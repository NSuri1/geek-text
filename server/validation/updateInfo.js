import Validator from 'validator';
import isEmpty from 'is-empty';
import User from '../services/user/model';
import bcrypt from 'bcryptjs';

module.exports = async function validateUpdateInput(data) {
  
    let errors = {};
	const upperCase = new RegExp('(?=.*[A-Z])');
	const number = new RegExp('(?=.*[0-9])');
    const special = new RegExp('(?=.*[!@#\$%\^&\*])'); 

    //username validation
    if(data.username) {
        let existingUser = await User.findOne({ username: data.username })
            if(existingUser) {
            errors.username = "Username already exists"
        }
    }    
    
    //email validation
    if(data.email) {
        let existingUser = await User.findOne({ email: data.email })
        if(existingUser) {
            errors.email = "Email already exists"
        }
        else if (!Validator.isEmail(data.email)) {
            errors.email = 'Invalid Email';
        }    
    } 

    //password validation
    if(data.password) {
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
        // Hash password before saving in database
        data.password = await bcrypt.hash(data.password, 10)
    } 

    
    
    return {
		errors,
        isValid: isEmpty(errors),
        data
	};
};