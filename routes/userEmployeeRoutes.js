const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const nodemailer = require('nodemailer');
const { User } = require('../models/UserEmployee');
const jwt = require('jsonwebtoken');

// Route to handle user signup
router.post('/signup', async (req, res) => {
  const { username, role, email, password } = req.body;

  try {
    // // Validate role
    // const validRoles = ['Employee', 'Admin', 'Manager'];
    // if (!validRoles.includes(role.toLowerCase())) {
    //   return res.status(400).json({ error: `Invalid role. Role must be one of: ${validRoles.join(', ')}` });
    // }

    // Check if the user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: 'User with this email already exists' });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user
    const newUser = new User({
      username,
      email,
      role: role.toLowerCase(),
      password: hashedPassword,
    });

    // Save the user to the database
    await newUser.save();

    // Configure Nodemailer transporter
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    // Email options
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: 'Welcome to PYT',
      html: `
        <h1>Welcome to PYT</h1>
        <p>Hello <strong>${username}</strong>. Your account has been created successfully as <strong>${role}</strong>.</p>
        <p>Please check the below credintials for logging into the portal</p>
        <ul>
        <li>Username : ${username}</li>
        <li>Password : ${password}</li>
        </ul>
        <p>Best Regards,<br>The Team</p>
      `,
    };

    // Send welcome email
    await transporter.sendMail(mailOptions);

    // Respond with success
    res.status(201).json({ message: 'User created and welcome email sent' });
  } catch (error) {
    console.error('Error during user creation:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Route to fetch all users
router.get('/users', async (req, res) => {
  try {
    // Fetch all users, excluding their passwords for security
    const users = await User.find().select('-password');
    res.status(200).json(users);
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).json({ error: 'Failed to fetch users' });
  }
});

router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required' });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    if (!process.env.JWT_SECRET) {
      console.error('JWT_SECRET is not defined');
      return res.status(500).json({ message: 'Server error: JWT secret not set' });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: '1h',
    });

    res.status(200).json({ token });
  } catch (error) {
    console.error('Error in /login route:', error); // Log the error
    res.status(500).json({ message: 'Server error' });
  }
});


module.exports = router;
