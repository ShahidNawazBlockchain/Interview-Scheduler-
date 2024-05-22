const mongoose = require('mongoose');
const Schema = mongoose.Schema;
        
const InterviewSchema = new Schema({
  candidateName: { type: String, required: true },
  slotId: { type: Schema.Types.ObjectId, ref: 'Slot', required: true },
  status: { type: String, required: true, enum: ['Scheduled', 'Completed', 'Cancelled'] },
});

module.exports = mongoose.model('Interview', InterviewSchema);
