const mongoose = require('mongoose');

const baseFields = {
  eventName: { type: String, required: true },
  eventType: { type: String, required: true },
  dateType: { type: String, enum: ['single', 'range'], required: true },
  eventDate: { type: Date },
  startDate: { type: Date },
  endDate: { type: Date },
  location: { type: String, required: true },
  venue: { type: String },
  category: { type: String, enum: ['planner', 'performer', 'crew'], required: true },
  createdAt: { type: Date, default: Date.now },
};

const performerSchema = new mongoose.Schema({
  ...baseFields,
  performerType: String,
  genre: [String],
  performanceDuration: String,
  numberOfPerformers: Number,
  budget: String,
  technicalRequirements: String,
  languages: [String],
  hasPerformedBefore: Boolean,
  audienceSize: String,
  additionalNotes: String,
});

module.exports = mongoose.model('PerformerRequirement', performerSchema);
