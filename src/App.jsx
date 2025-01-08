import { Routes, Route } from 'react-router-dom'
import { User } from '../src/layouts'

function App() {
  return (
    <Routes>
      <Route path="/*" element={<User />} />
    </Routes>
  )
}
export default App;
