import express from "express";

import {
  authenticate,
  isEmptyBody,
  isEmptyParams,
  isValidId,
} from "../../middlewares/index.js";
import { validateBody, validateParams } from "../../decorators/index.js";
import chatControllers from "../../controllers/chat-controllers.js";
import {
  addChatSchema,
  addMessageSchema,
  updateChatSchema,
  updateMessageSchema,
} from "../../schema/chat-schema.js";

const chatsRouterRouter = express.Router();

chatsRouterRouter.use(authenticate);

chatsRouterRouter.post(
  "/",
  isEmptyBody,
  validateBody(addChatSchema),
  chatControllers.addChat
);

chatsRouterRouter.put(
  "/:chatId",
  isValidId,
  isEmptyBody,
  validateBody(updateChatSchema),
  chatControllers.updateChatById
);

chatsRouterRouter.delete("/:chatId", isValidId, chatControllers.deleteChatById);

chatsRouterRouter.post(
  "/:chatId/",
  isEmptyBody,
  validateBody(addMessageSchema),
  chatControllers.addMessage
);

chatsRouterRouter.put(
  "/:chatId/:messageId",
  isEmptyBody,
  validateBody(updateMessageSchema),
  chatControllers.updateMessageById
);

chatsRouterRouter.delete(
  "/:chatId/:messageId",
  isValidId,
  chatControllers.deleteMessageById
);

export default chatsRouterRouter;
