import { Router } from "express";
import {
  getByTypes,
  getAreaAverage,
  getPeriodicTrends,
} from "../controllers/analysis.controller";

const router = Router();

router.get("/deadliest-attack-types", getByTypes);
router.get("/highest-casualty-regions", getAreaAverage);
router.get("/incident-trends", getPeriodicTrends);

export default router;
