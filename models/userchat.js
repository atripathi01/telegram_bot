
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username:{
        type: String,
        required: true,
        unique: true
    },
    chatId:{
        type: String,
        required: true,
        unique: true
    },
    points:{
        type: Number,
        default: 0
    },
    lastUpdated:{
        type: Date,
        default: Date.now
    }
})
module.exports = mongoose.model('UserChat', userSchema);