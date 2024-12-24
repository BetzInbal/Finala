interface MyState {
  err: boolean
  loading: boolean
}

export interface AttackTypeModel extends MyState {
  data: {
    _id: string
    attackType: string
    casualties: number
  }[]
}

export interface AttackRegionModel extends MyState {
  data: {
    _id: string
    attackRegion: string
    casualties: number
    longitude: number
    latitude: number
  }[]
}

export interface AttackYearModel extends MyState {
  data: {
    _id: string
    attackYear: string
    attacksNum: number
  }[]
}
export interface AttackOrganizationModel extends MyState {
  data: {
    _id: string
    organization: string
    attacksNumber: number
  }[]
}
