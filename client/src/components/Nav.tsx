import {
  Box,
  Divider,
  List,
  ListItemButton,
  ListItemText,
} from '@mui/material'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const Nav = () => {
  const [selectedIndex, setSelectedIndex] = useState(0)
  const navigate = useNavigate()

  const handleListItemClick = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>,
    index: number
  ) => {
    setSelectedIndex(index)
  }

  const handelNavigate = (path: string) => {
    navigate(`/${path}`)
  }
  return (
    <div className='nav'>
      <Box sx={{ width: '100%', height :`10%`, maxWidth: 360, bgcolor: 'background.paper' }}>
        <List component='nav' aria-label='main mailbox folders'>
          <ListItemButton
            selected={selectedIndex === 0}
            onClick={(event) => {
              handleListItemClick(event, 0)
              handelNavigate('attackTypes')
            }}
          >
            <ListItemText primary='Deadliest Attack Types' />
          </ListItemButton>

          <ListItemButton
            selected={selectedIndex === 1}
            onClick={(event) => {
              handelNavigate('CasualtyRegions')
              handleListItemClick(event, 1)
            }}
          >
            <ListItemText primary='Highest Casualty Regions' />
          </ListItemButton>

          <ListItemButton
            selected={selectedIndex === 2}
            onClick={(event) => {
              handleListItemClick(event, 2)
              handelNavigate('IncidentTrends')
            }}
          >
            <ListItemText primary='Incident Trends' />
          </ListItemButton>

          <Divider />
          <ListItemButton
            selected={selectedIndex === 3}
            onClick={(event) => {
              handleListItemClick(event, 3)
              handelNavigate('TopGroups')
            }}
          >
            <ListItemText primary='Top Groups' />
          </ListItemButton>
        </List>
      </Box>
    </div>
  )
}

export default Nav
