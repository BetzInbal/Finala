import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from '@mui/material'
import { useRef, useState } from 'react'
import MarkeCoordinates from './MarkeCoordinates'
import { createNewAttackService } from '../../../services/CRUD.service'
import { CreateAttackDTO } from '../../../types/createAttackDTO'

const CreateAttackForm = () => {
  const [open, setOpen] = useState(false)

  const [nkill, setnkill] = useState<number>(0)
  const [nwound, setnwound] = useState<number>(0)
  const [city, setcity] = useState<string>('')
  const [iyear, setiyear] = useState<number>(2000)
  const [gname, setgname] = useState<string>('')
  const [attacktype1_txt, setattacktype1_txt] = useState<string>('')
  const [summary, setsummary] = useState<string>('')
  const [latitude, setlatitude] = useState<number>(0)
  const [longitude, setlongitude] = useState<number>(0)

  const form: CreateAttackDTO = {
    nkill,
    nwound,
    city,
    iyear,
    latitude,
    longitude,
    gname,
    attacktype1_txt,
    summary,
  }

  const response = useRef<CreateAttackDTO>(form)

  const handelSubmit = async () => {
    const { attacktype1_txt, city, gname, longitude } = form
    if (!attacktype1_txt || !city || !gname || !longitude)
      alert('All filds must be be provided')
    const data = await createNewAttackService(form)
    response.current = data.data
    alert(`New attack created at: ${response.current.city}, by: ${response.current.gname}, and ${response.current.nkill} daied`)
  }

  return (
    <div className='create-attack-form'>
      <h1>New Attack Form</h1>
      <Button onClick={() => setOpen(!open)}>Chose Coordinates</Button>
      <TextField
        size='small'
        className='myInput'
        onChange={(e) => {
          setnkill(Number(e.target.value))
        }}
        id='outlined-basic'
        label='Killed'
        variant='outlined'
        type='number'
      />
      <TextField
        size='small'
        className='myInput'
        onChange={(e) => setnwound(Number(e.target.value))}
        id='outlined-basic'
        label='Wounded'
        variant='outlined'
        type='number'
      />
      <TextField
        size='small'
        className='myInput'
        onChange={(e) => setcity(e.target.value)}
        id='outlined-basic'
        label='City'
        variant='outlined'
      />
      <TextField
        size='small'
        className='myInput'
        onChange={(e) => setiyear(Number(e.target.value))}
        id='outlined-basic'
        label='Year'
        variant='outlined'
        type='number'
      />
      <TextField
        size='small'
        className='myInput'
        onChange={(e) => setgname(e.target.value)}
        id='outlined-basic'
        label='Organization'
        variant='outlined'
      />
      <TextField
        size='small'
        className='myInput'
        onChange={(e) => setattacktype1_txt(e.target.value)}
        id='outlined-basic'
        label='Attack Type'
        variant='outlined'
      />
      <TextField
        size='small'
        className='myInput'
        onChange={(e) => setsummary(e.target.value)}
        id='outlined-basic'
        label='Summary'
        variant='outlined'
      />
      <div>
        <Button onClick={handelSubmit}>Submit</Button>
      </div>
      <Dialog
        open={open}
        onClose={() => setOpen(!open)}
        aria-labelledby='alert-dialog-title'
        aria-describedby='alert-dialog-description'
      >
        <DialogTitle id='alert-dialog-title'>
          {'Click on the map to Chose coordinates'}
        </DialogTitle>
        <DialogContent sx={{ height: 500, width: 500 }}>
          <MarkeCoordinates setlatitude={setlatitude} setlongitude={setlongitude} />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(!open)} autoFocus>
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}

export default CreateAttackForm
