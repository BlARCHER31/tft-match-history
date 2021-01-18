import express from "express";
import { getTestRoutes } from "./testRoutes";
import { getTFTRoutes } from "./tftRoutes";

function getRoutes() {
  const router = express.Router();
  router.use("/test", getTestRoutes());
  router.use("/tft", getTFTRoutes());
  return router;
}

export { getRoutes };
