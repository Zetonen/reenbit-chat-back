import { HttpError } from "../../helpers/index.js";
import Chat from "../../model/Chat.js";

const getInfo = async (req, res) => {
  const { _id: owner } = req.user;

  const chat = await Chat.find({ owner });

  if (!chat) {
    throw HttpError(401, "Chat not found!");
  }
  res.json({chat});
};
export default getInfo;
