import app from "./app.js";
import mongoose from "mongoose";
import "dotenv/config";

const { PORT, DB_HOST } = process.env;
mongoose
  .connect(DB_HOST)
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Database connection successful with port ${PORT}`);
    });
  })
  .catch(error => {
    console.log(error.message);
    process.exit(1);
  });
