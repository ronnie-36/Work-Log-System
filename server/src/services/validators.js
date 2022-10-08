import Joi from 'joi';

const loginSchema = Joi.object().keys({
  email: Joi.string().trim().email().required(),
  password: Joi.string().trim().min(6).max(20).required(),
});

const registerSchema = Joi.object().keys({
  name: Joi.string().trim().min(2).max(30).required(),
  email: Joi.string().trim().email().required(),
  contact: Joi.string().trim().required(),
  password: Joi.string().trim().min(6).max(20).required(),
  department: Joi.string().trim().required(),
  joiningDate: Joi.string().trim().required(),
});

export { loginSchema, registerSchema };