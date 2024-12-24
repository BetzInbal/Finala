
import eventModel, { IEvent } from "../models/eventModel";
import Typemodel, { IType } from "../models/Typemodel";
import AreaModel, { IArea } from "../models/AreaModel";
import YearOrgModel, { IYearOrg } from "../models/YearOrgModel";

const types:IType[] = []
const areas:IArea[] = []
const yearsOrg:IYearOrg[] = []
const events:IEvent[] = []


const insertToTypes = async (event: IEvent) => {
    try {
        const type = types.find((t) => t.type === (event.attacktype1_txt || "Unknown")) ||
        types[types.push(new Typemodel({
            type: (event.attacktype1_txt || "Unknown"),
            total_damage: 0
        }))-1]
        type.total_damage += (event.nkill + event.nwound)
    } catch (error) {
        console.log("[insertToTypes]")
        console.error(error);
    }
}

const insertToArieas = async (event: IEvent) => {
        try {
            const area = areas.find((a)=> a.area === (event.country_txt || "Unknown")) ||
            areas[areas.push(new AreaModel({
                area:  (event.country_txt || "Unknown"),
                latitude: event.latitude,
                longitude: event.longitude
            }))-1]

            const incidents = area.incidents.find((i) => i.gname === event.gname) ||
            area.incidents[area.incidents.push({
                gname: event.gname,
                total_damage: 0,
                total_incidents: 0
            })-1]
    
            incidents.total_damage += (event.nkill + event.nwound)
            incidents.total_incidents++
            area.latitude = area.latitude ? area.latitude : event.latitude;
            area.longitude = area.longitude ? area.longitude : event.longitude;
            area.total_damage+= event.nkill + event.nwound
            area.total_incidents++
            area.avg = area.total_damage / area.total_incidents
        } catch (error) {
            console.log("[insertToArieas]")
            console.error(error);
        }

}


const insertToIYearOrg = async (event: IEvent) => {
    try {
        const yearOrg = yearsOrg.find((y)=> y.year === event.iyear ) || yearsOrg[yearsOrg
            .push(  await new YearOrgModel({
                year: event.iyear
         }))-1]
        const incidents = yearOrg.arr_incidents.find((i) => i.gname === event.gname) ||
        yearOrg.arr_incidents[yearOrg.arr_incidents
            .push({
                gname: event.gname,
                total_incidents: 0
            })-1]
        incidents.total_incidents++
        yearOrg.total_incidents++
        yearOrg.month[event.imonth-1]        
    } catch (error) {
        console.log("[insertToIYearOrg]")
        console.error(error);

    }

}

export default async (data: IEvent[]) => {
    for (const event of data) {
        await insertToArieas(event)
        await insertToTypes(event)
        await insertToIYearOrg(event)
        await events.push(new eventModel(event))
    }
    await eventModel.insertMany(events)
    await AreaModel.insertMany(areas)
    await YearOrgModel.insertMany(yearsOrg)
    await Typemodel.insertMany(types)

}
