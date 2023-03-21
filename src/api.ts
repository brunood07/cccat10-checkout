import express, { Request, Response } from "express";
import pgp from "pg-promise";
import Checkout from "./Checkout";
import { validate } from "./validator";

const app = express();
app.use(express.json());

app.post("/checkout", async function (req: Request, res: Response) {
  try {
    const checkout = new Checkout();
    const output = await checkout.execute(req.body);
    res.json(output);
  } catch (e: any) {
    res.status(422).json({
      message: e.message,
    });
  }
});

app.listen(3000);
