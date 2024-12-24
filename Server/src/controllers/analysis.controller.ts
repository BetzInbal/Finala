import { NextFunction, Request, Response } from "express";
import { getByTypeServ, getAreaAverageServ, getPeriodicTrendsServ } from "../services/analysis.service";

export const getByTypes = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const result =  await getByTypeServ();
    res.json(result);
  } catch (err) {
    console.error("Can't get expenses data", err);
    next(err);
  }
};
export const getAreaAverage = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const result = await getAreaAverageServ();
    res.json(result);
  } catch (err) {
    console.error("Can't get expenses data", err);
    next(err);
  }
};



export const getPeriodicTrends = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const result = await getPeriodicTrendsServ();
    res.json(result);
  } catch (err) {
    console.error("Can't get expenses data", err);
    next(err);
  }
};
