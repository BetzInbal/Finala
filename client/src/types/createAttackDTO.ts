export interface CreateAttackDTO {
  nkill: number
  nwound: number
  city: string
  iyear: number
  imonth?: number
  latitude: number
  longitude: number
  gname: string
  attacktype1_txt: string
  summary: string
}