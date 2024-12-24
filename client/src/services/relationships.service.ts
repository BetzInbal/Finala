import { AttackOrganizationDto } from '../types/attackYear.DTO'

const BASE_URL = 'http://localhost:1414/'

export const getTopGroupsByRegion = async (attackOrganization: AttackOrganizationDto) => {
  try {
    const res = await fetch(
      `${BASE_URL}api/relationships/top-groups/${attackOrganization.region}/${JSON.stringify(attackOrganization.top)}`
    )
    const data = await res.json()
    return data
  } catch (err) {
    console.error(err)
  }
}

export const getRegions = async () => {
  try {
    const res = await fetch(
      `${BASE_URL}api/relationships/regions`
    )
    const data = await res.json()
    return data
  } catch (err) {
    console.error(err)
  }
}
