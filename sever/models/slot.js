const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const SlotSchema = new Schema({
  date: { type: Date, required: true },
  startTime: { type: String, required: true },
  endTime: { type: String, required: true },
  interviewer: { type: String, required: true },
});

module.exports = mongoose.model('Slot', SlotSchema);
