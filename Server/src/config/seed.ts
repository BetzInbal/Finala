import fs from "fs/promises"
import eventModel, { IEvent } from "../models/eventModel";
import Typemodel, { IType } from "../models/Typemodel";
import AreaModel, { IArea } from "../models/AreaModel";
import YearModel, { IYear } from "../models/YearModel";
import createAnlists, { totnk, totnw } from "../utils/createAnlists";
import { IYearOrg } from "../models/YearOrgModel";



export const getFileData = async <T>(): Promise<T[]> => {
    try {
        const dataFromFile: any = await fs.readFile(
            `C:/Users/codco/Music/Global-Terrorism-Statistics/Server/globalterrorismdb_0718dist.json`,
            "utf-8"
        );
        const parsaData: T[] = await JSON.parse(dataFromFile);
        return parsaData || [];
    } catch (error) {
        console.log(error);
        return [];
    }
};

export default async ()=>{
  const event = await eventModel.findOne()
  if(event){
    console.log("[database] DB id full");
    //return 
  }
  console.log("[database] Inserts the original information into DB");
  await seed()


}

export const types:IType[] = []
export const areas:IArea[] = []
export const yers:IYear[] = []
export const yearsOrg:IYearOrg[] = []


export const seed = async () => {
  
  
    const data = await  getFileData<IEvent>()
         if (!data.length) throw new Error("Failed to read JSON file");
         for (const event of data) {
           await createAnlists(event)
         }
         console.log("after listed");
        try {
          
          await AreaModel.insertMany(areas)
        } catch (error) {
          console.error(error)
          }
        
        console.log("after insert");
        
        //await YearModel.insertMany(yers)
}


// eventModel.aggregate(
//   [
//   {$group:{
//   _id: "expression",
//   "fieldN": {
//     $sum: "$nwound"
//   }
// }}
// ]
// )
//        console.log(data);