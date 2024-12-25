import { useEffect, useRef, useState } from 'react'
import { getRegions, getTopGroupsByRegion } from '../../services/relationships.service'
import { AttackOrganizationDto } from '../../types/attackYear.DTO'
import { AttackOrganizationModel } from '../../types/state.model'
import {
  Bar,
  BarChart,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'
import { Autocomplete, FormControlLabel, Switch, TextField } from '@mui/material'

const TopGroups = () => {
  const initialSatate: AttackOrganizationModel = {
    err: false,
    data: [],
    loading: false,
  }
  const [topGroups, setTopGroups] = useState<AttackOrganizationModel>(initialSatate)
  // const [regions, setRegions] = useState([])
  const regions = useRef([])
  const topRegion = useRef(true)

  const getData = async (attackOrganization: AttackOrganizationDto) => {
    setTopGroups({ ...topGroups, loading: true })
    const data = await getTopGroupsByRegion(attackOrganization)
    setTopGroups({ ...topGroups, data: data.data })
  }

  const getRegionsList = async () => {
    const data = await getRegions()
    // setRegions(data.data)
    regions.current = data.data
  }
  useEffect(() => {
    getData({ region: 'New York City', top: topRegion.current })
    getRegionsList()
  }, [])

  const handelSelectRegion = async (e: any, v: any) => {
    const filter = v
      ? { region: v.label, top: topRegion.current }
      : { region: 'New York City', top: topRegion.current }
    getData(filter)
  }

  const handelTopChange = async (e: any) => {
    topRegion.current = !topRegion.current
    getData({ region: 'New York City', top: topRegion.current })
  }

  return (
    <div className='page charts-page'>
      <div className='filters'>
        <FormControlLabel
          control={<Switch defaultChecked />}
          label='Top 5'
          onChange={(e) => handelTopChange(e)}
        />
        <Autocomplete
          className='filter'
          size='small'
          options={regions.current.map((a) => {
            return { label: a }
          })}
          renderInput={(params) => <TextField {...params} label='Region' />}
          onChange={(e, v) => handelSelectRegion(e, v)}
        />
      </div>

      <ResponsiveContainer width='80%' height='70%' maxHeight={400}>
        <BarChart
          data={topGroups.data.map((a) => {
            return { name: a.organization, Attacs: a.attacksNumber }
          })}
        >
          <XAxis dataKey='name' angle={5} fontSize={10} tickMargin={10} />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey='Attacs' stackId='a' fill='#5feee7' />
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}

export default TopGroups
