const PlannerRequirement = require('../models/PlannerRequirement');
const PerformerRequirement = require('../models/PerformerRequirement');
const CrewRequirement = require('../models/CrewRequirement');

// POST /api/requirements/planner
const createPlannerRequirement = async (req, res) => {
  try {
    const { eventName, location, category, dateType } = req.body;
    if (!eventName || !location || !category || !dateType) {
      return res.status(400).json({ success: false, message: 'Missing required fields' });
    }
    const doc = new PlannerRequirement({ ...req.body });
    const saved = await doc.save();
    return res.status(201).json({ success: true, data: saved });
  } catch (error) {
    console.error('createPlannerRequirement error:', error.message);
    return res.status(500).json({ success: false, message: error.message });
  }
};

// POST /api/requirements/performer
const createPerformerRequirement = async (req, res) => {
  try {
    const { eventName, location, category, dateType } = req.body;
    if (!eventName || !location || !category || !dateType) {
      return res.status(400).json({ success: false, message: 'Missing required fields' });
    }
    const doc = new PerformerRequirement({ ...req.body });
    const saved = await doc.save();
    return res.status(201).json({ success: true, data: saved });
  } catch (error) {
    console.error('createPerformerRequirement error:', error.message);
    return res.status(500).json({ success: false, message: error.message });
  }
};

// POST /api/requirements/crew
const createCrewRequirement = async (req, res) => {
  try {
    const { eventName, location, category, dateType } = req.body;
    if (!eventName || !location || !category || !dateType) {
      return res.status(400).json({ success: false, message: 'Missing required fields' });
    }
    const doc = new CrewRequirement({ ...req.body });
    const saved = await doc.save();
    return res.status(201).json({ success: true, data: saved });
  } catch (error) {
    console.error('createCrewRequirement error:', error.message);
    return res.status(500).json({ success: false, message: error.message });
  }
};

// GET /api/requirements/all
const getAllRequirements = async (req, res) => {
  try {
    const [planners, performers, crew] = await Promise.all([
      PlannerRequirement.find().lean(),
      PerformerRequirement.find().lean(),
      CrewRequirement.find().lean(),
    ]);

    const all = [...planners, ...performers, ...crew].sort(
      (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
    );

    return res.status(200).json({ success: true, count: all.length, data: all });
  } catch (error) {
    console.error('getAllRequirements error:', error.message);
    return res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = {
  createPlannerRequirement,
  createPerformerRequirement,
  createCrewRequirement,
  getAllRequirements,
};
