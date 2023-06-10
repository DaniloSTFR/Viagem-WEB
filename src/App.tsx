import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Home } from "./pages/Home";
import { NewRegister } from "./pages/NewRegister"
import { Employees } from "./pages/Employees";
import { Positions } from "./pages/Positions";
import { Teams } from "./pages/Teams";
import { Trips } from "./pages/Trips";
import { Login } from "./pages/Login";
import { RequireAuth } from './contexts/RequireAuth';
import { AuthContextProvider } from './contexts/AuthContext'


function App() {
  return (
    <BrowserRouter>
      <AuthContextProvider>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/login" element={<Login />} />
          <Route path="/home" element={<RequireAuth><Home /></RequireAuth>} />
          <Route path="/cadastrar" element={<RequireAuth><NewRegister /></RequireAuth>} />
          <Route path="/funcionarios" element={<RequireAuth><Employees /></RequireAuth>} />
          <Route path="/cargos" element={<RequireAuth><Positions /></RequireAuth>} />
          <Route path="/equipes" element={<RequireAuth><Teams /></RequireAuth>} />
          <Route path="/viagens" element={<RequireAuth><Trips /></RequireAuth>} />
        </Routes>
      </AuthContextProvider>
  </BrowserRouter>
  )
}

export default App;
