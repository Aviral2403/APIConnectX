const Candidate = require('../models/Candidate');
const { candidateValidation } = require('../utils/validation');

const addCandidate = async (req, res) => {
  try {
    const { error } = candidateValidation.validate(req.body);
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }

    const { first_name, last_name, email } = req.body;

    const candidate = new Candidate({
      first_name,
      last_name,
      email,
      user_id: req.user._id
    });

    await candidate.save();
    res.status(201).json(candidate);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getCandidates = async (req, res) => {
  try {
    const candidates = await Candidate.find({ user_id: req.user._id });
    res.json(candidates);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { addCandidate, getCandidates };