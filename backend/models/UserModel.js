import mongoose from 'mongoose';

const User = mongoose.Schema({
    fullname: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    confirmpassword: {
        type: String,
        required: true
    },
    role: {
        type: String,
        default: "User",
        enum: ['Developer', 'Recruiter']
    },
    age: {
        type: Number,
        required: true
    },
    skills: {
        type: [String],
        default: []
    },
    totalquestions: {
        type: Number,
        default: 0
    },
    map: {
        type: Map,
        of: Number,
        default: {}
    }
}, {timestamps:true});

const UserModel = mongoose.model('User', User);
export default UserModel;