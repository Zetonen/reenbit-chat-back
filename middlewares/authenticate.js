import { HttpError } from "../helpers/index.js";
import User from "../model/User.js";
import ctrlWrapper from "../decorators/ctrlWrapper.js";

const authenticate = async (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization) {
    throw HttpError(401, "Not authorized");
  }
  const [bearer, token] = authorization.split(" ");
  if (bearer !== "Bearer") {
    throw HttpError(401);
  }

  try {
    const user = await User.findOne({ token });
    if (!user) {
      throw HttpError(401, "User not found");
    }
    req.user = user;
    next();
  } catch (error) {
    throw HttpError(401, error.message);
  }
};
export default ctrlWrapper(authenticate);
