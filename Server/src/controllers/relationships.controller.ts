import { Request, Response, NextFunction } from "express";
import {  getDedlyOrgServ,  getFiveAllServ,  getOrgByYearsServ
} from "../services/relationships.service";

export const getFiveAll = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const result = await getFiveAllServ();
    res.json(result);
  } catch (err) {
    console.error("Can't get expenses data", err);
    next(err);
  }
};

export const getOrgByYears = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const result = await getOrgByYearsServ();
    res.json(result);
  } catch (err) {
    console.error("Can't get expenses data", err);
    next(err);
  }
};

export const getDedlyOrg = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const result = await getDedlyOrgServ();
    res.json(result);
  } catch (err) {
    console.error("Can't get expenses data", err);
    next(err);
  }
};
