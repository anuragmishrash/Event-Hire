const express = require('express');
const router = express.Router();
const {
  createPlannerRequirement,
  createPerformerRequirement,
  createCrewRequirement,
  getAllRequirements,
} = require('../controllers/requirementsController');

router.post('/planner', createPlannerRequirement);
router.post('/performer', createPerformerRequirement);
router.post('/crew', createCrewRequirement);
router.get('/all', getAllRequirements);

module.exports = router;
