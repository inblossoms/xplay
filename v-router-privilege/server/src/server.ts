import express, { Application } from "express";

const app: Application = express(),
  PORT = 3301;

app.use(express.urlencoded({ extended: true })).use(express.json());

app.listen(PORT, () => {
  console.log(`server is running on port ${PORT}.`);
});
