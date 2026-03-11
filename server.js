require("dotenv").config();
const mongoose = require("mongoose");
const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

// 1. Kết nối "não" Backend với "kho" MongoDB
mongoose
    .connect(process.env.MONGO_URI)
    .then(() => console.log("TheBad ơi, kết nối MongoDB thành công rồi!"))
    .catch((err) => console.error("Lỗi kết nối:", err));

// 2. Tạo Schema (Bản thiết kế sản phẩm) - Thay thế cho cấu trúc trong file JSON
const productSchema = new mongoose.Schema({
    name: { type: String, required: true },
    price: Number,
    stock: Number,
    category: String,
    brand: String,
    imageUrl: String,
    createdAt: { type: Date, default: Date.now },
});

const Product = mongoose.model("Product", productSchema);

// 3. API Lấy danh sách (READ)
app.get("/testProduct", async (req, res) => {
    try {
        const products = await Product.find(); // Tìm tất cả sản phẩm trong DB
        res.json(products);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// 4. API Thêm sản phẩm (CREATE)
app.post("/testProduct", async (req, res) => {
    try {
        const newProduct = new Product(req.body);
        const savedProduct = await newProduct.save(); // Lưu vào Cloud
        res.status(201).json(savedProduct);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// 5. API Xóa (DELETE)
app.delete("/testProduct/:id", async (req, res) => {
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

const PORT = process.env.PORT || 5000;
app.listen(PORT, () =>
    console.log(`Server chạy tại: http://localhost:${PORT}`),
);
