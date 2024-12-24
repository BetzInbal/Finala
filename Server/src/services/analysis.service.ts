import AreaModel from "../models/AreaModel";
import Typemodel, { IType } from "../models/Typemodel";
import sortBy from 'lodash/sortBy';
import YearOrgModel from "../models/YearOrgModel";
import { IAreaAverageDto, IPeriodicTrendsDto } from "../types/Dtos";


// return IType[]
export const getByTypeServ = async () => {
  try {
    const result: IType[] = await Typemodel.find();
    const res: IType[] = sortBy(result, ["total_damage"])
    return res;
  } catch (err) {
    console.error(err);
    throw err;
  }
};

// return IAreaAverageDto[]
export const getAreaAverageServ = async () => {
  try {
    const result:IAreaAverageDto[] = await AreaModel.aggregate([{
      $project: {
        "area": 1,
        "latitude": 1,
        "longitude": 1,
        "avg": 1
      }
    },
    {
      $sort: {
        "avg": -1
      }
    }])
    console.log(result);
    return result;
    
  } catch (err) {
    console.error(err);
    throw err;
  }
};


// return IPeriodicTrendsDto[]
export const getPeriodicTrendsServ = async () => {
  try {
    const result:IPeriodicTrendsDto[] = await YearOrgModel.aggregate([{
      $project: {
        year: 1,
        total_incidents:1,
        month: 1
      }
    }])  
    console.log(result);
    return result;
  } catch (err) {
    console.error(err);
    throw err;
  }
};

