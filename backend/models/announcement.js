const mongoose = require('mongoose');

const announcement = mongoose.Schema({
    crname:{
        type: String,
        required: true,
    },
    cremail:{
        type: String,
        required: true,
        unique: true,
    },
    title: {
        type: Number,
        required: true,
        unique: true,
    },
    description: {
        type: String,
        required: true,
    },

    
})

const Announcement = new mongoose.model('announcement', announcement);


export default Announcement;

