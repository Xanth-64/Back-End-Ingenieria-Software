import express from "express";

const app = express();
export const start = async () => {
  app.listen(3000, () => {
    console.log("App Listening on Port 3000");
  });
};
