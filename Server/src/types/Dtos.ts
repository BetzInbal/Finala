import { incidents } from "../models/AreaModel";
import Typemodel, { IType } from "../models/Typemodel";



export interface IAreaAverageDto {
    area: string,
    latitude: number,
    longitude: number,
    avg: number
}


export interface IPeriodicTrendsDto {
    year: number,
    total_incidents: number,
    month: number[]
}


export interface IFiveAllDto {
    area: string,
    latitude: number,
    longitude: number,
    incidents: incidents[]
}


export interface IOrgByYearsDto {
    year: number,
    total_incidents: number,
    arr_incidents: {
        gname: string,
        total_incidents: number
    }[]
}

export interface IDedlyOrgDto {
    area: string,
    latitude: number,
    longitude: number,
    incidents: incidents[]
}

