import { useEffect, useRef, useState } from 'react'
import { getDeadliestYears } from '../../services/analysis.service'
import { AttackYearModel } from '../../types/state.model'
import {
  Bar,
  BarChart,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'
import { AttackYearDto } from '../../types/attackYear.DTO'
import { Autocomplete, TextField } from '@mui/material'

const setArrayOfYears = () => {
  const years = []
  for (let i = 2017; i > 1970; i--) {
    years.push(i)
  }
  return years
}
const setArrayOfRange = () => {
  const range = []
  for (let i = 8; i < 47; i++) {
    range.push(i)
  }
  return range
}

const AttackYears = () => {
  const initialSatate: AttackYearModel = {
    err: false,
    data: [],
    loading: false,
  }

  const [attackYears, setAttackYears] = useState<AttackYearModel>(initialSatate)

  const filterState = useRef({
    fromYear: 1970,
    toYear: 2017,
  })

  useEffect(() => {
    getData({ Nyears: 20 })
  }, [])

  const getData = async (filter: AttackYearDto) => {
    setAttackYears({ ...attackYears, loading: true })
    const data = await getDeadliestYears(filter)
    setAttackYears({ ...attackYears, loading: false, data: data.data })
  }

  const handelSelectSingelYear = async (e: any, v: any) => {
    const filter = v ? { year: v.label } : { Nyears: 20 }
    await getData(filter)
  }

  const handelSelectFromYeaer = async (e: any, v: any) => {
    if (!v) return
    filterState.current = { ...filterState.current, fromYear: v.label }
    await getData(filterState.current)
  }

  const handelSelectToYeaer = async (e: any, v: any) => {
    if (!v) return
    filterState.current = { ...filterState.current, toYear: v.label }
    await getData(filterState.current)
  }

  const handelSelectYearsFromNow = async (e: any, v: any) => {
    const filter: AttackYearDto = v ? { Nyears: v.label } : { Nyears: 20 }
    await getData(filter)
  }

  return (
    <div className='page charts-page'>
      <div className='filters'>
        <Autocomplete
          className='filter'
          options={setArrayOfYears().map((a) => {
            return { label: a.toString() }
          })}
          size='small'
          renderInput={(params) => <TextField {...params} label='Year' />}
          onChange={(e, v) => handelSelectSingelYear(e, v)}
        />
        <Autocomplete
          className='filter'
          size='small'
          options={setArrayOfYears().map((a) => {
            return { label: a.toString() }
          })}
          renderInput={(params) => <TextField {...params} label='From Year' />}
          onChange={(e, v) => handelSelectFromYeaer(e, v)}
        />
        <Autocomplete
          className='filter'
          size='small'
          options={setArrayOfYears().map((a) => {
            return { label: a.toString() }
          })}
          renderInput={(params) => <TextField {...params} label='To Year' />}
          onChange={(e, v) => handelSelectToYeaer(e, v)}
        />
        <Autocomplete
          className='filter'
          size='small'
          options={setArrayOfRange().map((a) => {
            return { label: a.toString() }
          })}
          renderInput={(params) => <TextField {...params} label='Range' />}
          onChange={(e, v) => handelSelectYearsFromNow(e, v)}
        />
      </div>
      <ResponsiveContainer width='80%' height='70%'>
        <BarChart
          data={attackYears.data.map((a) => {
            return { name: a.attackYear, Attacs: a.attacksNum }
          })}
        >
          <XAxis dataKey='name' />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey='Attacs' stackId='a' fill='#5feee7' />
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}

export default AttackYears
