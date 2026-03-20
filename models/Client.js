const mongoose = require("mongoose");

const clientSchema = new mongoose.Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    fullName: { type: String },
    email: { type: String, unique: true },
    phone: String,
    rank: String,
    totalSpending: { type: Number, default: 0 },
    createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Client", clientSchema);
