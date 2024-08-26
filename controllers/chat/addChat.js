import Chat from "../../model/Chat.js";

const addChat = async (req, res) => {
  const { _id: owner } = req.user;
  const { firstName, secondName } = req.body;
  const addedChat = await Chat.create({
    owner,
    firstName,
    secondName,
  });

  res.json({ addedChat });
};

export default addChat;
