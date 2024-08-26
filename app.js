import express from "express";
import cors from "cors";
import "dotenv/config";
import chatsRouter from "./routes/api/chats-routers.js";
import usersRouter from "./routes/api/users-routers.js";
// import swaggerUi from "swagger-ui-express";
// import swaggerDocument from "./swagger.json" assert { type: "json" };
import { createClerkClient } from "@clerk/clerk-sdk-node";

const { CLERK_SECRET_KEY } = process.env;

export const clerkClient = createClerkClient({ secretKey: CLERK_SECRET_KEY });

const app = express();


app.use(cors());
app.use(express.json());

// app.use(express.static("public"));

app.use("/api/users", usersRouter);
app.use("/api/chats", chatsRouter);
// app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use((req, res) => {
  res.status(404).json({ message: "Not found" });
});

app.use((err, req, res, next) => {
  console.log(err);
  const { status = 500, message = "Server error" } = err;
  res.status(status).json({
    message,
  });
});

export default app;
