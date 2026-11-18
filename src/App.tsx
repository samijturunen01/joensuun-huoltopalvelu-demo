import { Route, Routes } from 'react-router-dom'
import { Layout } from './components/layout/Layout'
import { Home } from './pages/Home'
import { Service } from './pages/Service'
import { Parts } from './pages/Parts'
import { PlateGuidePage } from './pages/PlateGuidePage'
import { Prices } from './pages/Prices'
import { Request } from './pages/Request'
import { Contact } from './pages/Contact'
import { NotFound } from './pages/NotFound'

export function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="huolto" element={<Service />} />
        <Route path="varaosat" element={<Parts />} />
        <Route path="tyyppikilpi" element={<PlateGuidePage />} />
        <Route path="hinnasto" element={<Prices />} />
        <Route path="huoltopyynto" element={<Request />} />
        <Route path="yhteystiedot" element={<Contact />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  )
}
