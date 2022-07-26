import logo from './logo.svg';
import './App.css';
import Login from './Login';
import Admin from './Dashboard/Admin';
import {Switch,Route} from 'react-router-dom'

function App() {
  return (
    <div className="App">
 <Switch>
  <Route path="/" exact>
    <Login/>
  </Route>
  <Route>
    <Admin/>
  </Route>
 </Switch>
    </div>
  );
}

export default App;
