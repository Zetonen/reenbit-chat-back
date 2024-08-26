import Joi from "joi";

export const emailRegexp = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

export const userSignupSchema = Joi.object({
  email: Joi.string()
    .pattern(emailRegexp)
    .required()
    .messages({ "any.required": "The email is required!" }),
  token: Joi.string()
    .required()
    .messages({ "any.required": "The token is required!" }),
  userName: Joi.string()
    .required()
    .messages({ "any.required": "The userName is required!" }),
});

export const userSigninSchema = Joi.object({
  email: Joi.string()
    .pattern(emailRegexp)
    .required()
    .messages({ "any.required": "The email is required!" }),
  token: Joi.string()
    .required()
    .messages({ "any.required": "The token is required!" }),
});
