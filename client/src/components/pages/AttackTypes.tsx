import { useEffect, useState } from 'react'
import { getDeadliestAttackTypes } from '../../services/analysis.service'
import { AttackTypeModel } from '../../types/state.model'
import { Autocomplete, CircularProgress, TextField } from '@mui/material'
import {
  Bar,
  BarChart,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'

const AttackTypes = () => {
  const initialSatate: AttackTypeModel = {
    err: false,
    data: [],
    loading: false,
  }
  const [attackTypes, setAttackTypes] = useState<AttackTypeModel>(initialSatate)
  const [attacksData, setAttacksData] = useState<typeof initialSatate.data>([])
  useEffect(() => {
    ;(async () => {
      setAttackTypes({ ...attackTypes, loading: true })
      const data = await getDeadliestAttackTypes()
      setAttackTypes({ ...attackTypes, loading: false, data: data.data })
      setAttacksData(data.data)
    })()
  }, [])

  const handelSelect = async (e: any, newValue: any) => {
    const params =
      newValue.length > 0 ? newValue.map((a: any) => a.attackType) : ['any-type']
    console.log(newValue.map((a: any) => a.attackType))
    setAttackTypes({ ...attackTypes, loading: true })
    const data = await getDeadliestAttackTypes(params)
    setAttackTypes({ ...attackTypes, loading: false, data: data.data })
  }

  return (
    <div className='page charts-page'>
      {attackTypes.loading && <CircularProgress className='loading' />}
      <Autocomplete
        size='small'
        multiple
        limitTags={2}
        id='multiple-limit-tags'
        options={attacksData}
        getOptionLabel={(option) => option.attackType}
        renderInput={(params) => (
          <TextField {...params} label='Attack Types' placeholder='most populer' />
        )}
        sx={{ width: '300px' }}
        onChange={(e, v) => handelSelect(e, v)}
      />

      <ResponsiveContainer width='80%' height='70%'>
        <BarChart
          data={attackTypes.data.map((a) => {
            return { name: a.attackType, casualties: a.casualties }
          })}
        >
          <XAxis dataKey='name' angle={12} fontSize={7} tickMargin={5} />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey='casualties' stackId='a' fill='#5feee7' />
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}

export default AttackTypes
