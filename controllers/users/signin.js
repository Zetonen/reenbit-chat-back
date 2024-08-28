import User from "../../model/User.js";
import { HttpError } from "../../helpers/index.js";
import Chat from "../../model/Chat.js";

const signin = async (req, res) => {
  const { email, token: authorization } = req.body;
  const [bearer, token] = authorization.split(" ");
  if (bearer !== "Bearer") {
    throw HttpError(401);
  }
  const user = await User.findOne({ email });
  if (!user) {
    throw HttpError(401, "Email invalid!");
  }
  const { _id: id } = user;
  await User.findByIdAndUpdate(id, { token });

  const chat = await Chat.find({ owner: id });

  res.json({
    token,
    user: {
      id,
      email,
    },
    chat,
  });
};

export default signin;
