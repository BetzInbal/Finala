import { AttackYearDto } from '../types/attackYear.DTO'

const BASE_URL = 'http://localhost:1414/'

export const getDeadliestAttackTypes = async (attackType = ['any-type']) => {
  try {
    const res = await fetch(
      `${BASE_URL}api/analysis/deadliest-attack-types/${JSON.stringify(attackType)}`
    )
    const data = await res.json()
    return data
  } catch (err) {
    console.error(err)
  }
}

export const getDeadliestRegions = async (attackType = 'any-type') => {
  try {
    const res = await fetch(
      `${BASE_URL}api/analysis/highest-casualty-regions/${attackType}`
    )
    const data = await res.json()
    return data
  } catch (err) {
    console.error(err)
  }
}

export const getDeadliestYears = async (attackYear: AttackYearDto) => {
  try {
    const res = await fetch(
      `${BASE_URL}api/analysis/incident-trends/?filter=${JSON.stringify(attackYear)}`
    )
    const data = await res.json()
    return data
  } catch (err) {
    console.error(err)
  }
}
