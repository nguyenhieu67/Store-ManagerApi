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

// --- KHAI BÁO CÁC ĐƯỜNG LỘ TRÌNH (ROUTES) ---
const productRoutes = require("./routes/productRoutes");
const clientRoutes = require("./routes/clientRoutes");

// Sử dụng Routes (Tiền tố /product và /client)
app.use("/product", productRoutes);
app.use("/client", clientRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () =>
    console.log(`Server chạy tại: http://localhost:${PORT}`),
);
