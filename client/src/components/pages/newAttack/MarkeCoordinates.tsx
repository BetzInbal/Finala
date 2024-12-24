import { useState } from 'react'
import { MapContainer, Marker, Popup, TileLayer, useMapEvents } from 'react-leaflet'
import { LatLng } from 'leaflet'

interface Coordinates {
  lat: number
  lng: number
}

interface Props {
  setlongitude: React.Dispatch<React.SetStateAction<number>>
  setlatitude: React.Dispatch<React.SetStateAction<number>>
}

const SetCoordinates = ({ setlatitude, setlongitude }: Props) => {
  const [coordinates, setCoordinates] = useState<Coordinates>({ lat: 51.505, lng: -0.09 })

  useMapEvents({
    click(e) {
      const { lat, lng }: LatLng = e.latlng
      setCoordinates({ lat, lng })
      setlatitude(lat)
      setlongitude(lng)
    },
  })

  return (
    <div>
      {coordinates.lat && coordinates.lng && <p>Click on the map to get coordinates</p>}
      <Marker position={[coordinates.lat, coordinates.lng]}>
        <Popup>
          {`lat: ${coordinates.lat.toFixed(4)}`} <br />
          {`lng: ${coordinates.lng.toFixed(4)}`}
        </Popup>
      </Marker>
    </div>
  )
}

const MarkeCoordinates = ({ setlatitude, setlongitude }: Props) => {
  return (
    <div className='marke-coordinates'>
      <MapContainer
       style={{height: 500}}
        center={[51.505, -0.09]}
        zoom={13}
        scrollWheelZoom={true}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
        />
        <SetCoordinates setlatitude={setlatitude} setlongitude={setlongitude}/>
      </MapContainer>
    </div>
  )
}

export default MarkeCoordinates
