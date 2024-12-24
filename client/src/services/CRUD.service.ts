import { CreateAttackDTO } from '../types/createAttackDTO'

const BASE_URL = 'http://localhost:1414/'

export const createNewAttackService = async (attack: CreateAttackDTO) => {
  try {
    const res = await fetch(`${BASE_URL}api/CRUD/create`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(attack),
    })
    const data = await res.json()
    return data
  } catch (err) {
    console.error(err)
  }
}
