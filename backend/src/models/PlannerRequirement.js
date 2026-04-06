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

const plannerSchema = new mongoose.Schema({
  ...baseFields,
  servicesNeeded: [String],
  estimatedBudget: String,
  guestCount: Number,
  specialRequirements: String,
  experienceLevel: String,
  preferredLanguages: [String],
  remoteOk: Boolean,
  urgency: String,
});

module.exports = mongoose.model('PlannerRequirement', plannerSchema);
