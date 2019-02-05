import express from 'express';
import userService from '../services/user';
import crud from './_crud';

const router = new express.Router();

router.post('/new', createUser);
router.post('/update/:id', updateUser);
router.get('/:id', fetchUsersById);
router.get('/', fetchUsers);

function createUser(request, response) {
	crud.create(userService, request, response);
}

function updateUser(request, response) {
	crud.update(userService, request, response);
}

function fetchUsers(request, response) {
	crud.fetch(userService, request, response);
}

function fetchUsersById(request, response) {
	crud.fetchById(userService, request, response);
}

export default {router};
