const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
    name: { type: String, required: true },
    price: Number,
    stock: Number,
    category: String,
    brand: String,
    imageUrl: String,
    createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Product", productSchema);
