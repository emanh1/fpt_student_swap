import * as swaps from "../controllers/swap.controller.js";
import express from "express";

export default (app) => {
  const router = express.Router();

  router.post("/", swaps.create);

  router.get("/", swaps.findAll);

  router.get("/:id", swaps.findOne);

  router.put("/:id", swaps.update);

  router.delete("/:id", swaps.deleteSwap);

  router.delete("/", swaps.deleteAll);

  app.use("/api/swap-requests", router); 
};
