const mongoose = require('mongoose');

const user = mongoose.Schema({
    fullname:{
        type: String,
        required: true,
    },
    email:{
        type: String,
        required: true,
        unique: true,
    },
    studentid: {
        type: Number,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    }
    
})

const User = new mongoose.model('user', user);


export default User;

