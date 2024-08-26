import Joi from "joi";

export const addChatSchema = Joi.object({
  firstName: Joi.string().required().messages({
    "string.base": `firstName must be string`,
    "any.required": `firstName is required`,
  }),
  secondName: Joi.string().required().messages({
    "string.base": `secondName must be string`,
    "any.required": `secondName is required`,
  }),
});

export const addMessageSchema = Joi.object({
  message: Joi.string().max(5000).required().messages({
    "string.base": `Message must be string`,
    "any.required": `Message is required`,
  }),
  date: Joi.string().required().messages({
    "string.base": `Date must be string`,
    "any.required": `Date is required`,
  }),
});

export const updateChatSchema = Joi.object({
  firstName: Joi.string().required().messages({
    "string.base": `firstName must be string`,
    "any.required": `firstName is required`,
  }),
  secondName: Joi.string().required().messages({
    "string.base": `secondName must be string`,
    "any.required": `secondName is required`,
  }),
});

export const updateMessageSchema = Joi.object({
  message: Joi.string().max(5000).required().messages({
    "string.base": `Message must be string`,
    "any.required": `Message is required`,
  }),
});
