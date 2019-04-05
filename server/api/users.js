import express from 'express';
import userService from '../services/user';
import User from '../services/user/model';
import crud from './_crud';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import config from '../config';

//input validation
import validateRegisterInput from '../validation/register';
import validateLoginInput from '../validation/login';
import validateUpdateInput from '../validation/updateInfo';

const router = new express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.post('/update/:id', updateUser);
router.get('/:id', fetchUsersById);
router.get('/', fetchUsers);

function registerUser(req, res) {
	// Form validation
	const { errors, isValid } = validateRegisterInput(req.body);

	// Check validation
	if (!isValid) {
		return res.status(400).json(errors);
	}

	// Check if Email or Username already exists
	User.findOne({ email: req.body.email }).then(user => {
		if (user) {
		  return res.status(400).json({ email: 'Email already exists' });
		}
		else {
			User.findOne({ username: req.body.username }).then(user => {
				if (user) {
					return res.status(400).json({ username: 'Username already exists' });
				}
				else {
					// Hash password before saving in database
					bcrypt.genSalt(10, (err, salt) => {
						bcrypt.hash(req.body.password, salt, (err, hash) => {
							if (err) throw err;
							req.body.password = hash;
							crud.create(userService, req, res);
						});
					});
				}
			});
		}	
	});
}

function loginUser(req, res) {
	// Form validation
	const { errors, isValid } = validateLoginInput(req.body);
	
	// Check validation
	if (!isValid) {
		return res.status(400).json(errors);
	}
	
	const username = req.body.username;
	const password = req.body.password;
	
	// Find user by Username
	User.findOne({ username : username }).then(user => {
		if (!user) {
			return res.status(404).json({ username: 'Username not found' });
		}
		else {
			// Check password
			bcrypt.compare(password, user.password).then(isMatch => {
				if (isMatch) {
					// User matched
					// Create JWT Payload
					const payload = {
						id: user.id
					};
					// Sign token
					jwt.sign(
						payload,
						config.secretOrKey,
						{
							expiresIn: 86400 // 1 day in seconds
						},
						(err, token) => {
							res.json({
								success: true,
								token: 'Bearer ' + token
							});
						}
					);
				} 
				else {
					return res
						.status(400)
						.json({ password: 'Password incorrect' });
				}
			});
		}
	});
}

async function updateUser(request, response) {
	// Form validation
	const { errors, isValid, data} = await validateUpdateInput(request.body);

	request.body = data

	// Check validation
	if(!isValid) {
		return response.status(400).json(errors);
	}
	
	crud.update(userService, request, response);
	
}

function fetchUsers(request, response) {
	crud.fetch(userService, request, response);
}

function fetchUsersById(request, response) {
	crud.fetchById(userService, request, response);
}

export default {router};
