const express = require('express');
const router = express.Router();
const Interview = require('../models/Interview');

// GET /interviews: Fetch all scheduled interviews
router.get('/', async (req, res) => {
  try {
    const interviews = await Interview.find().populate('slotId');
    res.json(interviews);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET /interviews/:id: Fetch a single scheduled interview by ID
router.get('/:id', async (req, res) => {
  try {
    const interview = await Interview.findById(req.params.id).populate('slotId');
    if (!interview) return res.status(404).json({ message: 'Interview not found' });
    res.json(interview);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST /interviews: Schedule a new interview
router.post('/', async (req, res) => {
  const interview = new Interview({
    candidateName: req.body.candidateName,
    slotId: req.body.slotId,
    status: req.body.status,
  });
  try {
    const newInterview = await interview.save();
    res.status(201).json(newInterview);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// PUT /interviews/:id: Reschedule an existing interview by ID
router.put('/:id', async (req, res) => {
  try {
    const interview = await Interview.findById(req.params.id);
    if (!interview) return res.status(404).json({ message: 'Interview not found' });

    interview.candidateName = req.body.candidateName || interview.candidateName;
    interview.slotId = req.body.slotId || interview.slotId;
    interview.status = req.body.status || interview.status;

    const updatedInterview = await interview.save();
    res.json(updatedInterview);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// DELETE /interviews/:id: Cancel a scheduled interview by ID
router.delete('/:id', async (req, res) => {
  try {
    const interview = await Interview.findById(req.params.id);
    if (!interview) return res.status(404).json({ message: 'Interview not found' });

    await interview.remove();
    res.json({ message: 'Interview canceled' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
