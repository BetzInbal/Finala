import { Outlet } from 'react-router-dom'
import Header from '../Header'
import Logo from '../Logo'
import Nav from '../Nav'

const Pages = () => {
  return (
    <div className='app'>
      <Logo />
      <Header />
      <Nav />
      <div className='pages'>
        <Outlet />
      </div>
    </div>
  )
}

export default Pages
