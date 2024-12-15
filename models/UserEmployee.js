

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// const userEmployeeSchema = new Schema({
//     username: { type: String, required: true, maxLength: 50 },
//     password: { type: String, required: true, maxLength: 128 },
//     firstName: { type: String, required: true, maxLength: 50 },
//     lastName: { type: String, required: true, maxLength: 50 },
//     email: { type: String, required: true, unique: true, maxLength: 100 },
//     dateJoined: { type: Date, default: Date.now, required: true },
//     role: { type: String, enum: ['employee', 'admin','manager'], default: 'employee', required: true },
//     fatherName: { type: String, maxLength: 50, required: true },
//     motherName: { type: String, maxLength: 50, required: true },
//     phoneNumber: { type: String, required: true, maxLength: 15 },
//     address: { type: String, required: true, maxLength: 255 },
//     educationType: { type: String, required: true, maxLength: 100 },
//     yearOfPassing: { type: Number, required: true, min: 1900, max: new Date().getFullYear() },
//     profilePicture: { type: String, maxLength: 255 },
//     bio: { type: String, maxLength: 2000 },
// }, { timestamps: true });

const userSchema = new Schema({
    username: { type: String, required: true, maxLength: 50 },
    email: { type: String, required: true, unique: true, maxLength: 100 },
    dateJoined: { type: Date, default: Date.now, required: true },
    role: { type: String, enum: ['employee', 'admin', 'manager'], default: 'employee', required: true },
    password: { type: String, required: true, maxLength: 128 },
  });

const User = mongoose.model('User', userSchema);
// const Employee= mongoose.model('Employee', userEmployeeSchema);

module.exports= {User}
