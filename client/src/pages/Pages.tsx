import { Outlet } from 'react-router-dom'
import Header from '../Header'
import Nav from '../Nav'

const Pages = () => {
  return (
    <div className='app'>
      {/* //<Header /> */}
      <Nav />
      <div className='pages'>
        <Outlet />
      </div>
    </div>
  )
}

export default Pages
