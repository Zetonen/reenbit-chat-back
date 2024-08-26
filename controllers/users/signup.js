import User from "../../model/User.js";
import { HttpError } from "../../helpers/index.js";
import { clerkClient } from "../../app.js";

const signup = async (req, res) => {
  const { email, token, userName } = req.body;

  const clerkUser = await clerkClient.users.getUserList({
    emailAddress: [email],
  });

  const user = await User.findOne({ email });
  if (!clerkUser || clerkUser.length === 0 || user) {
    throw HttpError(409, "Email already exist!");
  }
  const newUser = await User.create({
    email,
    token,
    userName
  });
  const { _id: id } = newUser;

  res.status(201).json({
    token,
    user: {
      id,
      email,
      userName
    },
  });
};

export default signup;
