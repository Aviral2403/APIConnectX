const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/User');
const { generateApiKey } = require('../utils/apiKeyGenerator');
const { registerValidation, loginValidation } = require('../utils/validation');

const register = async (req, res) => {
  try {
    const { error } = registerValidation.validate(req.body);
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }

    const { first_name, last_name, email, password } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: 'Email already registered' });
    }

    const api_key = generateApiKey();

    const user = new User({
      first_name,
      last_name,
      email,
      password_hash: password,
      api_key
    });

    await user.save();

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: '24h'
    });

    res.status(201).json({ token, api_key });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const login = async (req, res) => {
  try {
    const { error } = loginValidation.validate(req.body);
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }

    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user || !(await bcrypt.compare(password, user.password_hash))) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: '24h'
    });

    // Return the existing API key instead of generating a new one
    res.json({ token, api_key: user.api_key });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { register, login };