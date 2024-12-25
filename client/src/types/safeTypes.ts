interface safe {
    error: boolean
    loading: boolean
}


export interface ITypeSafe extends safe {
    data: ITypeDto[]
}

export interface ITypeDto {
        _id: string
        type: string
        total_damage: number
}
export interface IAreaAverageSafe extends safe {
    data: IAreaAverageDto[]
}
export interface IAreaAverageDto {
    _id:string
  area: string,
  latitude: number,
  longitude: number,
  avg: number
}



export interface IPeriodicTrendsSafe extends safe {
    data: IPeriodicTrendsDto[]
}
export interface IPeriodicTrendsDto {
_id:string,
  year: number,
  total_incidents: number,
  month: number[]
}


export interface IFiveAllSafe extends safe {
    data: IFiveAllDto[]
}
export interface IFiveAllDto {
_id:string,
    area: string,
    latitude: number,
    longitude: number,
    incidents: incidents[]
}

export interface AttackYearSafe extends safe {
    data: IOrgByYearsDto[]
}
export interface IOrgByYearsDto {
_id:string,
    year: number,
    total_incidents: number,
    arr_incidents: {
        gname: string,
        total_incidents: number
    }[]
}

export interface AttackOrganizationSafe extends safe {
    data: IDedlyOrgDto[]
}

export interface IDedlyOrgDto {
_id:string,
    area: string,
    latitude: number,
    longitude: number,
    incidents: incidents[]
}


export interface incidents {
    gname: string,
    total_incidents?: number
    total_damage?: number
}
