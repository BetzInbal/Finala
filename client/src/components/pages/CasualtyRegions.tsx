import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import { useEffect, useState } from 'react'
import { AttackRegionModel } from '../../types/state.model'
import { getDeadliestRegions } from '../../services/analysis.service'
import { Autocomplete, CircularProgress, TextField } from '@mui/material'

const CasualtyRegions = () => {
  const initialState: AttackRegionModel = {
    err: false,
    loading: false,
    data: [],
  }
  const [attackRegions, setAttackRegions] = useState(initialState)
  const [attackRegionsSelect, setAttackRegionsSelect] = useState(initialState.data)

  useEffect(() => {
    ;(async () => {
      setAttackRegions({ ...attackRegions, loading: true })
      const data = await getDeadliestRegions()
      setAttackRegions({ loading: false, err: data.err, data: data.data })
      setAttackRegionsSelect(data.data)
    })()
  }, [])

  const handelSelect = async (e: React.SyntheticEvent<Element, Event>, v: any) => {
    setAttackRegions({ ...attackRegions, loading: true })
    const data = await getDeadliestRegions(v?.label)
    setAttackRegions({ loading: false, err: data.err, data: data.data })
  }

  return (
    <div className='page'>
      <MapContainer
        className='map'
        center={[51.505, -0.09]}
        zoom={3}
        scrollWheelZoom={true}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
        />
        <Autocomplete
          options={attackRegionsSelect.map((a) => {
            return { label: a.attackRegion }
          })}
          sx={{ width: 300, zIndex: 900, position: 'absolute', right: 10, top: 10 }}
          renderInput={(params) => <TextField {...params} label='Region' />}
          onChange={(e, v) => handelSelect(e, v)}
        />

        {attackRegions.loading ? (
          <CircularProgress className='loading' />
        ) : (
          attackRegions.data.map((a) => (
            <Marker key={a._id} position={[a.latitude, a.longitude]}>
              <Popup key={a._id}>
                {'City: ' + a.attackRegion} <br /> {'Casualties:' + a.casualties}
              </Popup>
            </Marker>
          ))
        )}
      </MapContainer>
    </div>
  )
}

export default CasualtyRegions
