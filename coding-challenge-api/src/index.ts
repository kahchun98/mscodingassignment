import express, { Request, Response } from "express";

import cors from "cors";
import { getUser } from "./user";
import { handleOrders } from "./sales";

const app = express();
const port = 8080;

app.use(cors());
app.get("/user", getUser);

app.get("/sales", (req, res) => {
  /** Write an api for the widget */
  handleOrders(req,res)
});

app.listen(port, () => {
  console.log(`server started at http://localhost:${port}`);
});
