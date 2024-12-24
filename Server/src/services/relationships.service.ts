
import AreaModel from "../models/AreaModel";
import YearOrgModel from "../models/YearOrgModel";
import { IDedlyOrgDto, IFiveAllDto, IOrgByYearsDto } from "../types/Dtos";


// return IFiveAllDto[]
export const getFiveAllServ = async () => {
  try {
    const result:IFiveAllDto[] = await AreaModel.aggregate([{
      $project: {
        "area": 1,
        "latitude": 1,
        "longitude": 1,
        "incidents":{$slice: [ {$sortArray: { input: "$incidents", sortBy: { total_incidents: -1 } }},5]}
      }}
    ]);
    return result;
  } catch (err) {
    console.error(err);
    throw err;
  }
};

export const getFiveAreaServ = async (area: string) => {
  try {
    const result =await AreaModel.aggregate([{$match:{area:area}},{
      $project: {
        "area": 1,
        "latitude": 1,
        "longitude": 1,
        "incidents":{$slice: [ {$sortArray: { input: "$incidents", sortBy: { total_incidents: -1 } }},5]}
      }}
]);
return result;
} catch (err) {
  console.error(err);
  throw err;
}
};


// return IOrgByYearsDto[]y
export const getOrgByYearsServ = async () => {
  try {
    const result:IOrgByYearsDto[] = await YearOrgModel.aggregate([{
      $project: {
        year: 1,
        total_incidents:1,
        arr_incidents: {$sortArray: { input: "$arr_incidents", sortBy: { total_incidents: -1 } }}
      }
    }])  
    return result;
  } catch (err) {
    console.error(err);
    throw err;
  }
};

// return IDedlyOrgDto[]
export const getDedlyOrgServ = async () => {
  try {
      const result:IDedlyOrgDto[] = await AreaModel.aggregate([{
        $project: {
        "area": 1,
        "latitude": 1,
        "longitude": 1,
        "incidents":{$slice: [ {$sortArray: { input: "$incidents", sortBy: { total_damage: -1 } }},1]}
      }}
]);
    return result;
  } catch (err) {
    console.error(err);
    throw err;
  }
};
