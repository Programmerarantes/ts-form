import { CreateUser } from "./components/CreateUser"
import UserTable from "./components/UserTable"
import {BrowserRouter, Routes, Route} from 'react-router-dom'

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<UserTable />}></Route>
        <Route path='create' element={<CreateUser />}></Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
