const express = require('express');
const router = express.Router();
const Slot = require('../models/Slot');

// GET /slots: Fetch all available interview slots
router.get('/', async (req, res) => {
  try {
    const slots = await Slot.find();
    res.json(slots);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET /slots/:id: Fetch a single interview slot by ID
router.get('/:id', async (req, res) => {
  try {
    const slot = await Slot.findById(req.params.id);
    if (!slot) return res.status(404).json({ message: 'Slot not found' });
    res.json(slot);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST /slots: Create a new interview slot
router.post('/', async (req, res) => {
  const slot = new Slot({
    date: req.body.date,
    startTime: req.body.startTime,
    endTime: req.body.endTime,
    interviewer: req.body.interviewer,
  });
  try {
    const newSlot = await slot.save();
    res.status(201).json(newSlot);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// PUT /slots/:id: Update an existing interview slot by ID
router.put('/:id', async (req, res) => {
  try {
    const slot = await Slot.findById(req.params.id);
    if (!slot) return res.status(404).json({ message: 'Slot not found' });

    slot.date = req.body.date || slot.date;
    slot.startTime = req.body.startTime || slot.startTime;
    slot.endTime = req.body.endTime || slot.endTime;
    slot.interviewer = req.body.interviewer || slot.interviewer;

    const updatedSlot = await slot.save();
    res.json(updatedSlot);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

router.delete('/slots/:id', async (req, res) => {
  try {
    const { id } = req.params;
    await Slot.findByIdAndDelete(id);
    res.status(200).send({ message: 'Slot deleted successfully' });
  } catch (error) {
    res.status(500).send({ message: 'Error deleting slot' });
  }
});


module.exports = router;
