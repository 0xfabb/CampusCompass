const express = require('express');

const mongoose = require('mongoose');

const connectToMongoDB = mongoose.connect('mongodb://localhost:27017/college');

export default connectToMongoDB;