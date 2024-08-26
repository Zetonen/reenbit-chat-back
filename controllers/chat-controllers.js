import { ctrlWrapper } from "../decorators/index.js";
import * as chatService from "./chat/index.js";

export default {
  addChat: ctrlWrapper(chatService.addChat),
  updateChatById: ctrlWrapper(chatService.updateChatById),
  deleteChatById: ctrlWrapper(chatService.deleteChatById),
  getChatInfo: ctrlWrapper(chatService.getChatInfo), //test
  addMessage: ctrlWrapper(chatService.addMessage), //test
  updateMessageById: ctrlWrapper(chatService.updateMessageById), //test
  deleteMessageById: ctrlWrapper(chatService.deleteMessageById), //test
};
