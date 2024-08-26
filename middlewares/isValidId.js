import { isValidObjectId } from "mongoose";
import { HttpError } from "../helpers/index.js";

const isValidId = (req, res, next) => {
  const { chatId } = req.params;

  if (!isValidObjectId(chatId)) {
    return next(HttpError(404, `${chatId} id not valid id`));
  }
  next();
};

export default isValidId;
