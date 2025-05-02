import * as swaps from "../controllers/swap.controller.js";
import { requireAuth, validateSwapRequest } from "../middleware/auth.middleware.js";
import express from "express";

export default (app) => {
  const router = express.Router();

  router.post("/", requireAuth, validateSwapRequest, swaps.create);

  router.get("/", requireAuth, swaps.findAll);

  router.get("/:id", requireAuth, swaps.findOne);

  router.put("/:id", requireAuth, validateSwapRequest, swaps.update);

  router.delete("/:id", requireAuth, swaps.deleteSwap);

  router.delete("/", requireAuth, swaps.deleteAll);

  app.use("/api/swap-requests", router); 
};
