const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// User Schema
const userSchema = new Schema({
    username: { type: String, required: true, maxLength: 50 },
    email: { type: String, required: true, unique: true, maxLength: 100 },
    dateJoined: { type: Date, default: Date.now, required: true },
    role: { type: String, enum: ['employee', 'admin', 'manager'], default: 'employee', required: true },
    password: { type: String, required: true, maxLength: 128 },
});


// Employee Schema
const employeeSchema = new Schema({
    empCode: { type: String, required: true, maxLength: 8 },
    firstName: { type: String, maxLength: 50 },
    lastName: { type: String, maxLength: 50 },
    dateOfBirth: { type: Date },
    fatherName: { type: String, maxLength: 50 },
    motherName: { type: String, maxLength: 50 },
    phoneNumber: { type: String, maxLength: 10 },
    adhaarNumber: { type: String, maxLength: 12 },
    user: { type: Schema.Types.ObjectId, ref: 'User', unique: true, required: true },
    panNumber: { type: String, maxLength: 12, unique: true },
    emergencyNumber: { type: String, maxLength: 10, unique: true },
});

// Education Schema
const educationTypes = ['10th class', '12th class', 'b.tech', 'm.tech', 'mca', 'bca'];
const employeeEducationSchema = new Schema({
    educationType: { type: String, enum: educationTypes, default: '10th class' },
    collegeName: { type: String, required: true, maxLength: 50 },
    collegeLocation: { type: String, required: true, maxLength: 40 },
    startYear: { type: Date, required: true },
    endYear: { type: Date, required: true },
    employee: { type: Schema.Types.ObjectId, ref: 'Employee', required: true },
});

// Attachments Schema
const documentTypes = ['aadhar', 'pan'];
const employeeAttachmentsSchema = new Schema({
    employee: { type: Schema.Types.ObjectId, ref: 'Employee', required: true },
    documentType: { type: String, enum: documentTypes, default: 'aadhar' },
    fileName: { type: String, required: true, maxLength: 255 },
    createdOn: { type: Date, default: Date.now },
});

// Leave Management Schemas
const leaveStatusTypes = ['Pending', 'Approved', 'Rejected', 'Cancelled'];
const leaveDayTypes = ['Full day', 'Half day (1st half)', 'Half day (2nd half)'];
const carryTypes = ['monthly', 'quarterly'];

// Leave Type Schema
const leaveTypeIndexSchema = new Schema({
    leaveName: { type: String, required: true, maxLength: 50, unique: true },
    leaveDescription: { type: String, required: true, maxLength: 255 },
});

// Leave Policy Schema
const leavePolicyTypesSchema = new Schema({
    maxDays: { type: Number, required: true },
    carryForwardType: { type: String, enum: carryTypes, default: 'monthly' },
    carryForward: { type: Boolean, default: false },
    leaveType: { type: Schema.Types.ObjectId, ref: 'LeaveTypeIndex', required: true },
    carryForwardDays: { type: Number, default: 0 },
});

// Leave Requests Schema
const employeeLeavesRequestsSchema = new Schema({
    employee: { type: Schema.Types.ObjectId, ref: 'Employee', required: true },
    leaveType: { type: Schema.Types.ObjectId, ref: 'LeaveTypeIndex', required: true },
    reportingManager: { type: Schema.Types.ObjectId, ref: 'User' },
    reasonForLeave: { type: String, required: true },
    statusOfLeave: { type: String, enum: leaveStatusTypes, default: 'Pending' },
});

// Leave Request Dates Schema
const employeeLeavesRequestsDatesSchema = new Schema({
    leaveRequest: { type: Schema.Types.ObjectId, ref: 'EmployeeLeavesRequests', required: true },
    date: { type: Date, default: Date.now, required: true },
    leaveDayType: { type: String, enum: leaveDayTypes, default: 'Full day' },
});

// Holiday Schema
const holidaysSchema = new Schema({
    holidayName: { type: String, required: true, maxLength: 50 },
    holidayDate: { type: Date, default: Date.now, required: true },
});

// Models
const User = mongoose.model('User', userSchema);
const Employee = mongoose.model('Employee', employeeSchema);
const EmployeeEducation = mongoose.model('EmployeeEducation', employeeEducationSchema);
const EmployeeAttachments = mongoose.model('EmployeeAttachments', employeeAttachmentsSchema);
const LeaveTypeIndex = mongoose.model('LeaveTypeIndex', leaveTypeIndexSchema);
const LeavePolicyTypes = mongoose.model('LeavePolicyTypes', leavePolicyTypesSchema);
const EmployeeLeavesRequests = mongoose.model('EmployeeLeavesRequests', employeeLeavesRequestsSchema);
const EmployeeLeavesRequestsDates = mongoose.model('EmployeeLeavesRequestsDates', employeeLeavesRequestsDatesSchema);
const Holidays = mongoose.model('Holidays', holidaysSchema);

module.exports = {
    User,
    Employee,
    EmployeeEducation,
    EmployeeAttachments,
    LeaveTypeIndex,
    LeavePolicyTypes,
    EmployeeLeavesRequests,
    EmployeeLeavesRequestsDates,
    Holidays,
};
