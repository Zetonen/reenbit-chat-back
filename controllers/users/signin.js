import User from "../../model/User.js";
import { HttpError } from "../../helpers/index.js";

const signin = async (req, res) => {
  const { email, token } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    throw HttpError(401, "Email or google id invalid!");
  }
  const { _id: id } = user;
  await User.findByIdAndUpdate(id, { token });

  res.json({
    token,
    user: {
      id,
      email,
    },
  });
};

export default signin;
