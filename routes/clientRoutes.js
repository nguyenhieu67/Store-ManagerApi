const express = require("express");
const router = express.Router();
const Client = require("../models/Client");

// GET all clients
router.get("/", async (req, res) => {
    try {
        const clients = await Client.find();
        res.json(clients);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// CREATE client
router.post("/", async (req, res) => {
    try {
        const newClient = new Client(req.body);
        await newClient.save();
        res.status(201).json(newClient);
    } catch (error) {
        // Log lỗi này ra terminal để biết chính xác tại sao lỗi
        console.error("Lỗi Backend:", error);
        res.status(500).json({ message: error.message });
    }
});

// DELETE client
router.delete("/:id", async (req, res) => {
    try {
        const result = await Client.findByIdAndDelete(req.params.id);
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
