const express = require("express");
const router = express.Router();
const Item = require("../models/Item");

router.post("/", async (req, res) => {
  try {
    const newItem = new Item({ name: req.body.name });
    const saved = await newItem.save();
    res.json(saved);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get("/", async (req, res) => {
  const items = await Item.find();
  res.json(items);
});

router.put("/:id", async (req, res) => {
  try {
    const updated = await Item.findByIdAndUpdate(
      req.params.id,
      { name: req.body.name },
      { new: true }
    );
    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Delete
router.delete("/:id", async (req, res) => {
  try {
    await Item.findByIdAndDelete(req.params.id);
    res.json({ message: "Item deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
