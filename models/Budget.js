const mongoose = require('mongoose');

// Define the Budget schema
const budgetSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Title is required']
    },
    budget: {
        type: Number,
        required: [true, 'Budget value is required']
    },
    color: {
        type: String,
        required: [true, 'Color is required'],
        validate: {
            validator: function (v) {
                return /^#[0-9A-Fa-f]{6}$/.test(v);
            },
            message: props => `${props.value} is not a valid hex color!`
        }
    }
});

module.exports = mongoose.model('Budget', budgetSchema);
