// const UserEmployee = require('../models/UserEmployee');
// const transporter = require('../config/emailConfig');

// exports.registerUser = async (req, res) => {
//     const { username, password, firstName, lastName, email, role, fatherName, motherName, phoneNumber, address, educationType, yearOfPassing, profilePicture, bio } = req.body;

//     try {
//         const user = new UserEmployee({
//             username,
//             password,
//             firstName,
//             lastName,
//             email,
//             role,
//             fatherName,
//             motherName,
//             phoneNumber,
//             address,
//             educationType,
//             yearOfPassing,
//             profilePicture,
//             bio,
//         });
//         await user.save();

//         const mailOptions = {
//             from: process.env.EMAIL_USER,
//             to: email,
//             subject: 'Welcome to Our System',
//             text: `Your credentials are:
// Username: ${username}
// Role: ${role}
// Date Joined: ${user.dateJoined}`,
//         };

//         await transporter.sendMail(mailOptions);
//         res.status(201).json({ message: 'User registered and email sent' });
//     } catch (error) {
//         console.error('Error registering user:', error);
//         res.status(500).json({ error: 'Server error' });
//     }
// };
