import { HttpError } from "../helpers/index.js";

const validateParams = schema => {
 const func = (req, res, next) => {
  const { error } = schema.validate(req.query);
  if (error) {
   return next(HttpError(400, error.message));
  }
  next();
 };
 return func;
};

export default validateParams;
