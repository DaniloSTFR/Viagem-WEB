import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Home } from "./pages/Home";
import { NewRegister } from "./pages/NewRegister"
import { Employees } from "./pages/Employees";
import { Positions } from "./pages/Positions";
import { Teams } from "./pages/Teams";
import { Trips } from "./pages/Trips";
import { Login } from "./pages/Login";


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/cadastrar" element={<NewRegister />} />
        <Route path="/funcionarios" element={<Employees />} />
        <Route path="/cargos" element={<Positions />} />
        <Route path="/equipes" element={<Teams />} />
        <Route path="/viagens" element={<Trips />} />
      </Routes>
  </BrowserRouter>
  )
}

export default App;
