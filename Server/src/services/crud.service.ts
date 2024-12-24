import eventModel, { IEvent } from "../models/eventModel";
import Typemodel, { IType } from "../models/Typemodel";
import AreaModel, { IArea } from "../models/AreaModel";
import YearOrgModel, { IYearOrg } from "../models/YearOrgModel";
import createAnlists from "../utils/createAnlists";
import { NextFunction, Request,
    Response, } from "express";


// get IEvent
export const create = async (event: IEvent) => {
    try {
        await createAnlists([event])
    } catch (error) {
        console.error(error)
    }
}


export const getByTypes = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const evid = req.params._id
    console.log(evid);

    const result =  await remove(evid);
    console.log(" remove");
    res.json("removed");
  } catch (err) {
    console.error("Can't get expenses data", err);
    next(err);
  }
};

//get event_id
export const remove = async (event_id: string) => {
    try {
        console.log("from remove");
        
        const event = await eventModel.findOneAndDelete({ _id:event_id })
        if (!event) throw new Error("[crud service] event the not found")
        await Typemodel.findOneAndUpdate(
            { type: event.attacktype1_txt }, { $inc: { total_damage: (event.nkill + event.nwound) } }
        );
        await Typemodel.findOneAndDelete({ total_damage: 0 })
        const month = "month." + (event.imonth - 1)
        await YearOrgModel.findOneAndUpdate(
            { year: event.iyear },
            {
                $inc: {
                    total_incidents: -1,
                    month: -1
                },
                $set: {
                    "arr_incidents.$[incident].total_incidents": {
                        $subtract: ["$arr_incidents.$[incident].total_incidents", 5]
                    }
                }
            }, {
                arrayFilters: [
                    { "incident.gname": event.gname }]
        }
        )
        await YearOrgModel.findOneAndDelete({ total_incidents: 0 })
        await AreaModel.updateOne(
            [
                { area: event.region_txt },
                {
                    $set: {
                        "incidents.$[incident].total_incidents": {
                            $subtract: ["$incidents.total_incidents", -1],
                        },
                        "incidents.$[incident].total_damage": {
                            $subtract: ["$incidents.total_damage", -(event.nkill + event.nwound)],
                        },
                        total_incidents: { $subtract: ["$total_incidents", 1] },
                        total_damage: { $subtract: ["$total_damage", event.nkill + event.nwound] },
                        avg: {
                            $cond: {
                                if: { $gt: ["$total_incidents", 1] },
                                then: {
                                    $divide: [
                                        { $subtract: ["$total_damage", event.nkill + event.nwound] },
                                        { $subtract: ["$total_incidents", 1] }
                                    ]
                                },
                                else: 0
                            }
                        }
                    }
                }
            ],
            {
                arrayFilters: [{ "incident.gname": event.gname },],
            }
        );
        await AreaModel.findOneAndDelete({ total_incidents: 0 })
    } catch (error) {
        console.error(error)
    }
}

//get IEvent
export const update = async (event: IEvent) => {
    try {
        await remove(event._id)
        await create(event)
    } catch (error) {
        console.error(error)
    }
}
