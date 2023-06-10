const mongoose = require('mongoose');

const travelSchema = new mongoose.Schema({
    name: String,
    email: String,
    destination: String,
    travelers: Number,
    budget: Number,
});

const TravelModel= mongoose.model('Travel',travelSchema);
module.exports ={TravelModel}