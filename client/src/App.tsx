import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Pages from './components/pages/Pages'
import AttackTypes from './components/pages/AttackTypes'
import CasualtyRegions from './components/pages/CasualtyRegions'
import AttackYears from './components/pages/AttackYears'
import TopGroups from './components/pages/TopGroups'
import CreateAttack from './components/pages/newAttack/CreateAttack'
import UpdateAttack from './components/pages/updateAttack/UpdateAttack'

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Pages />}>
          <Route path='attackTypes' element={<AttackTypes />} />
          <Route path='CasualtyRegions' element={<CasualtyRegions />} />
          <Route path='IncidentTrends' element={<AttackYears />} />
          <Route path='TopGroups' element={<TopGroups />} />
          <Route path="CreateAttack" element={<CreateAttack />} />
          <Route path="UpdateAttack" element={<UpdateAttack />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
