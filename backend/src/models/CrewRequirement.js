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

const crewSchema = new mongoose.Schema({
  ...baseFields,
  crewRoles: [String],
  numberOfCrewNeeded: Number,
  shiftType: String,
  shiftHours: String,
  payType: String,
  estimatedPay: String,
  uniformRequired: Boolean,
  uniformDetails: String,
  physicalRequirements: String,
  experienceRequired: Boolean,
  additionalInstructions: String,
});

module.exports = mongoose.model('CrewRequirement', crewSchema);
