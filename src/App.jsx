import './App.css'
import { Route, Routes } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import RegistrationPage from './pages/RegistrationPage';
import PetCreation from './pages/CreatePetPage';
import PetsList from './pages/ListPetPage';
function App() {
  return (
      <Routes>
        <Route path={"/"} Component={LoginPage} />
        <Route path={"/registration"} Component={RegistrationPage} />
        <Route path={"/create-pet"} Component={PetCreation} />
        <Route path={"/list-pets"} Component={PetsList}/>
      </Routes>

  )
}

export default App
