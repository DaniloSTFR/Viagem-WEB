import './App.css';
import { BrowserRouter,Route,Switch } from "react-router-dom";

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

        <Switch>
          <Route path="/" exact component={Login} />
          <Route path="/login" exact component={Login} />
          <Route path="/home" exact component={Home} />
          <Route path="/cadastrar" exact component={NewRegister} />
          <Route path="/funcionarios" exact component={Employees} />
          <Route path="/cargos" exact component={Positions} />
          <Route path="/equipes" exact component={Teams} />
          <Route path="/viagens" exact component={Trips} />
        </Switch>

  </BrowserRouter>
  )
}

export default App;
