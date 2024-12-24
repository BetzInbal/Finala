import { Router } from "express";
import {
  getFifthDataAll,
  getForthDataAll,
  getSixthData,
} from "../controllers/relationships.controller";

const router = Router();

router.get("/top-groups", getForthDataAll);
router.get("//groups-by-year", getFifthDataAll);
router.get("/deadliest-regions", getSixthData);

export default router;
