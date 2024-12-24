import { Router } from "express";
import { getDedlyOrg, getFiveAll, getOrgByYears
} from "../controllers/relationships.controller";

const router = Router();

router.get("/top-groups", getFiveAll);
router.get("//groups-by-year", getOrgByYears);
router.get("/deadliest-regions", getDedlyOrg);

export default router;
