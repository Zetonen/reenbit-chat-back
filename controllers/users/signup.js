import User from "../../model/User.js";
import { HttpError } from "../../helpers/index.js";
import { clerkClient } from "../../app.js";
import Chat from "../../model/Chat.js";

const signup = async (req, res) => {
  const { email, token: authorization, userName } = req.body;

  const [bearer, token] = authorization.split(" ");
  if (bearer !== "Bearer") {
    throw HttpError(401);
  }
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
    userName,
  });
  const { _id: id } = newUser;
  console.log(token);
  const aliceChat = await Chat.create({
    owner: id,
    firstName: "Alice",
    secondName: "Freeman",
  });
  const josefinaChat = await Chat.create({
    owner: id,
    firstName: "Josefina",
    secondName: " ",
  });
  const velazquezChat = await Chat.create({
    owner: id,
    firstName: "Velazquez",
    secondName: " ",
  });

  res.status(201).json({
    token,
    user: {
      id,
      email,
      userName,
    },
    chat: [aliceChat, josefinaChat, velazquezChat],
  });
};

export default signup;
