const express = require("express");
const router = express.Router();
const Product = require("../models/Product");

// 1. Lấy danh sách (GET /product)
router.get("/", async (req, res) => {
    // Dùng "/" thay vì "/product"
    try {
        const products = await Product.find();
        res.json(products);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// 2. Thêm sản phẩm (POST /product)
router.post("/", async (req, res) => {
    // Dùng "/" thay vì "/product"
    try {
        const newProduct = new Product(req.body);
        const savedProduct = await newProduct.save();
        res.status(201).json(savedProduct);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// 3. Xóa sản phẩm (DELETE /product/:id)
router.delete("/:id", async (req, res) => {
    // Dùng "/:id" thay vì "/product/:id"
    try {
        const result = await Product.findByIdAndDelete(req.params.id);
        if (result) {
            res.json({ message: "Xóa thành công khỏi MongoDB!" });
        } else {
            res.status(404).json({ message: "Không tìm thấy sản phẩm" });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
