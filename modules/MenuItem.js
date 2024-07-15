const mongoose = require('mongoose');

const menuItemSchema = new mongoose.Schema({
    name: {
        type: String, // Corrected to String
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    taste: {
        type: String,
        enum: ['sweet', 'spicy', 'sour'],
        required: true,
    },
    is_drink: {
        type: Boolean,
        default: false,
    },
    ingredients: {
        type: [String],
        default: [],
    },
    num_seles: {
        type: Number,
        default: 0,
    },
});

const MenuItem = mongoose.model('MenuItem', menuItemSchema);
module.exports = MenuItem;
