const mongoose = require('mongoose');

const tripSchema = mongoose.Schema({
  tripId: { type: String, required: true, unique: true },
  source: { type: String, required: true },
  destination: { type: String, required: true },
  vehicle: { type: mongoose.Schema.Types.ObjectId, ref: 'Vehicle', required: true },
  driver: { type: mongoose.Schema.Types.ObjectId, ref: 'Driver', required: true },
  weight: { type: String, required: true },
  distance: { type: String, required: true },
  status: { type: String, required: true, enum: ['Draft', 'Dispatched', 'Completed', 'Cancelled'], default: 'Draft' },
  timeInfo: { type: String }, // e.g. "45 min" or "Awaiting driver"
}, { timestamps: true });

module.exports = mongoose.model('Trip', tripSchema);
