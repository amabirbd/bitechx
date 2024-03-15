// routes/userRoutes.js
const express = require('express');
const router = express.Router();

// Sample hardcoded data
let users = [];

// Create a new user
router.post('/', (req, res) => {
  const { username, password } = req.body;
  const newUser = { username, password };
  users.push(newUser);
  res.status(201).json(newUser);
});

// Get all users
router.get('/', (req, res) => {
  res.json(users);
});

// Get a single user by username
router.get('/:username', (req, res) => {
  const { username } = req.params;
  const user = users.find(user => user.username === username);
  if (!user) {
    return res.status(404).json({ message: 'User not found' });
  }
  res.json(user);
});

// Update user password by username
router.put('/:username', (req, res) => {
  const { username } = req.params;
  const { password } = req.body;
  const userIndex = users.findIndex(user => user.username === username);
  if (userIndex === -1) {
    return res.status(404).json({ message: 'User not found' });
  }
  users[userIndex].password = password;
  res.json(users[userIndex]);
});

// Delete a user by username
router.delete('/:username', (req, res) => {
  const { username } = req.params;
  const userIndex = users.findIndex(user => user.username === username);
  if (userIndex === -1) {
    return res.status(404).json({ message: 'User not found' });
  }
  const deletedUser = users.splice(userIndex, 1)[0];
  res.json(deletedUser);
});

module.exports = router;
