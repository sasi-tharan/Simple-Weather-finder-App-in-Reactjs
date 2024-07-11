const express = require('express');
const router = express.Router();
const Item = require('../models/Item');

// @route   GET api/items
// @desc    Get all items
router.get('/', async (req, res) => {
  try {
    const items = await Item.find();
    res.json(items);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// @route   POST api/items
// @desc    Create an item
router.post('/', async (req, res) => {
  const newItem = new Item({
    name: req.body.name
  });

  try {
    const item = await newItem.save();
    res.json(item);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// @route   PUT api/items/:id
// @desc    Update an item
router.put('/:id', async (req, res) => {
  try {
    const item = await Item.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(item);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// @route   DELETE api/items/:id
// @desc    Delete an item
router.delete('/:id', async (req, res) => {
  try {
    await Item.findByIdAndRemove(req.params.id);
    res.json({ message: 'Item deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
