import { Request, Response, NextFunction } from "express";
import {
  getFifthAll,
  getFifthByOarg,
  getFifthByYear,
  getForthAll,
  getForthArea,
  getSixthArea,
} from "../services/relationships.service";

export const getForthDataAll = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const result = await getForthAll();
    res.json(result);
  } catch (err) {
    console.error("Can't get expenses data", err);
    next(err);
  }
};

export const getForthDataReg = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const result = await getForthArea(req.body.reg);
    res.json(result);
  } catch (err) {
    console.error("Can't get expenses data", err);
    next(err);
  }
};

export const getFifthDataAll = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const result = await getFifthAll();
    res.json(result);
  } catch (err) {
    console.error("Can't get expenses data", err);
    next(err);
  }
};

export const getFifthDataOarg = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const result = await getFifthByOarg(req.body.oarg);
    res.json(result);
  } catch (err) {
    console.error("Can't get expenses data", err);
    next(err);
  }
};

export const getFifthDataYear = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const result = await getFifthByYear(req.body.year);
    res.json(result);
  } catch (err) {
    console.error("Can't get expenses data", err);
    next(err);
  }
};

export const getSixthData = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const result = await getSixthArea(req.body.oarg);
    res.json(result);
  } catch (err) {
    console.error("Can't get expenses data", err);
    next(err);
  }
};
