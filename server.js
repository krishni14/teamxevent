// server.js
const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));  // To handle form data

// Simulated user data (in a real application, use a database)
const users = [
    {
        id: 1,
        username: 'testuser',
        passwordHash: bcrypt.hashSync('password123', 10),  // Simulate hashed password
    }
];

// Login endpoint
app.post('/login', (req, res) => {
    const { username, password } = req.body;

    // Find user by username
    const user = users.find(u => u.username === username);
    
    if (!user) {
        return res.status(400).json({ message: 'Invalid username or password' });
    }

    // Compare password hash
    const isPasswordValid = bcrypt.compareSync(password, user.passwordHash);

    if (!isPasswordValid) {
        return res.status(400).json({ message: 'Invalid username or password' });
    }

    // Generate JWT token (optional)
    const token = jwt.sign({ userId: user.id }, 'secretkey', { expiresIn: '1h' });

    res.json({ message: 'Login successful', token });
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
