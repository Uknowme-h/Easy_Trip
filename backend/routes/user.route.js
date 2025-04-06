import express from 'express';
import { verifyToken } from '../middleware/verifyToken.js';
import { createUser, getUsers, getUserById, updateUser, deleteUser } from '../controllers/user.controller.js';
const user_router = express.Router();

// Route to get all users
user_router.get('/', getUsers);

// Route to get a single user by ID
user_router.get('/:id', getUserById);

// Route to create a new user
user_router.post('/', createUser);

// Route to update a user by ID
user_router.put('/:id', updateUser);

// Route to delete a user by ID
user_router.delete('/:id', deleteUser);

export default user_router;