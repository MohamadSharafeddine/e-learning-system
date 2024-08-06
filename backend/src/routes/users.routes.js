import express from 'express';
import { createUser, getUsers, getUserById, updateUser, deleteUser } from '../controllers/user.controller.js';

const router = express.Router();

// Create a new user
router.post('/register', createUser);

// Get all users
router.get('/', getUsers);

// Get a specific user by ID
router.get('/:id', getUserById);

// Update a user
router.put('/:id', updateUser);

// Delete a user
router.delete('/:id', deleteUser);

export default router;
