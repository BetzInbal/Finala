import AreaModel from "../models/AreaModel";
//import "../models/location.model";
import Typemodel, { IType } from "../models/Typemodel";
import sortBy from 'lodash/sortBy';
import YearModel from "../models/YearModel";
import { areas } from "../config/seed";

export const getByTypeServ = async () => {
  try {
    const result: IType[] = await Typemodel.find();
    const res: IType[] = sortBy(result, ["total_damage"])
    //console.log(res);
    return res;
  } catch (err) {
    console.error(err);
    throw err;
  }
};


export const getAreaAverageServ = async () => {
  try {
    const result = await AreaModel.aggregate([{
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

export const getPeriodicTrendsServ = async () => {
  try {
    const result = await YearModel.aggregate([{
      $project: {
        year: 1,
        total_incidents:1,
        m1: {
          total_incidents:1
        },
        m2: {
          total_incidents:1
        },
        m3: {
          total_incidents:1
        },
        m4: {
          total_incidents:1
        },
        m5: {
          total_incidents:1
        },
        m6: {
          total_incidents:1
        },
        m7: {
          total_incidents:1
        },
        m8: {
          total_incidents:1
        },
        m9: {
          total_incidents:1
        },
        m10: {
          total_incidents:1
        },
        m11: {
          total_incidents:1
        },
        m12: {
          total_incidents:1
        }
      }
    }])
    console.log(result);
    return result;
  } catch (err) {
    console.error(err);
    throw err;
  }
};

// export const getSecContry = async (country: string) => {
//   try {
//     const result = await secModel
//       .find({ country: country })
//       .populate("locationArr");
//     return result;
//   } catch (err) {
//     console.error(err);
//     throw err;
//   }
// };

// export const getSecRegion = async (region: string) => {
//   try {
//     const result = await secModel
//       .find({ region: region })
//       .populate("locationArr");
//     return result;
//   } catch (err) {
//     console.error(err);
//     throw err;
//   }
// };

// export const getThirdAll = async () => {
//   try {
//     const result = await YearModel.find({});
//     console.log(result[0]);
//     return result;
//   } catch (err) {
//     console.error(err);
//     throw err;
//   }
// };








// export const getThirdByYear = async (year: string) => {
//   try {
//     const result = await thirdModel.find({ year: year });
//     console.log(result[0]);
//     return result;
//   } catch (err) {
//     console.error(err);
//     throw err;
//   }
// };

// export const getThirdByYearRange = async (
//   startYear: string,
//   endYear: string
// ) => {
//   try {
//     const list = [];
//     while (endYear >= startYear) {
//       const result = await thirdModel.find({ year: startYear });
//       list.push(result);
//       startYear = String(Number(startYear) + 1);
//     }
//     console.log(list);
//     return list;
//   } catch (err) {
//     console.error(err);
//     throw err;
//   }
// };
// export const getThirdBy5Year = async () => {
//   try {
//     let startYear = 2012;
//     const endYear = 2017;
//     const list = [];
//     while (endYear >= startYear) {
//       const result = await thirdModel.find({ year: startYear });
//       list.push(result);
//       startYear += 1;
//     }
//     console.log(list);
//     return list;
//   } catch (err) {
//     console.error(err);
//     throw err;
//   }
// };

// export const getThirdBy10Year = async () => {
//   try {
//     let startYear = 2007;
//     const endYear = 2017;
//     const list = [];
//     while (endYear >= startYear) {
//       const result = await thirdModel.find({ year: startYear });
//       list.push(result);
//       startYear += 1;
//     }
//     console.log(list);
//     return list;
//   } catch (err) {
//     console.error(err);
//     throw err;
//   }
// };
