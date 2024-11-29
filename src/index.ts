import express from "express";
import { PaymentController } from "./Infrastructure/adapters/PaymentController";
const app = express();

// create payment (amount, nbEch, customerId)
// payement , installments, Presta (Stripe )

/**
 *
 *
 *
 *
 */
app.post("payments", async (_req, res) => {
  const p = new PaymentController();
  await p.buy();
  res.json({
    status: "ok",
  });
});
app.get("/test", (_req, res) => {
  res.send("hello world");
});
