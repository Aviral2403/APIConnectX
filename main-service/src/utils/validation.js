const Joi = require('joi');

const registerValidation = Joi.object({
  first_name: Joi.string().min(2).max(50).required(),
  last_name: Joi.string().min(2).max(50).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required()
});

const loginValidation = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required()
});

const candidateValidation = Joi.object({
  first_name: Joi.string().min(2).max(50).required(),
  last_name: Joi.string().min(2).max(50).required(),
  email: Joi.string().email().required()
});

module.exports = {
  registerValidation,
  loginValidation,
  candidateValidation
};
