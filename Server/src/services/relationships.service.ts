
import AreaModel from "../models/AreaModel";
import YearOrgModel from "../models/YearOrgModel";



export const getFiveAllServ = async () => {
  try {
    const result = await AreaModel.aggregate([{
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

export const getOrgByYearsServ = async () => {
  try {
    const result = await YearOrgModel.aggregate([{
      $project: {
        year: 1,
        total_incidents:1,
        arr_incidents: {$sortArray: { input: "$incidents", sortBy: { total_incidents: -1 } }}
      }
    }])  
    console.log(result);
    return result;
  } catch (err) {
    console.error(err);
    throw err;
  }
};


export const getDedlyOrgServ = async () => {
  try {
    const result = await AreaModel.aggregate([{
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
