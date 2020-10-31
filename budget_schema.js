const mongoose = require("mongoose")

const budgetSchema = new mongoose.Schema ({
    title: {
        type: String,
        trim: true,
        required: true
    },
    budget: {
        type: Number,
        required: true,
        unique: true
    },
    color: {
        type: String,
        trim: true,
        required: true
    }
    },
    {collection: 'budget_c'}
);

module.exports = mongoose.model('budget_c', budgetSchema)