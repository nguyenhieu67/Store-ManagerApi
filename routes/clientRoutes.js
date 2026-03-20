const express = require("express");
const router = express.Router();
const Client = require("../models/Client");

// GET all clients
router.get("/", async (req, res) => {
    const clients = await Client.find();
    res.json(clients);
});

// CREATE client
router.post("/", async (req, res) => {
    const newClient = new Client(req.body);
    await newClient.save();
    res.status(201).json(newClient);
});

// DELETE client
router.delete("/:id", async (req, res) => {
    await Client.findByIdAndDelete(req.params.id);
    res.json({ message: "Xóa khách hàng thành công!" });
});

module.exports = router;
