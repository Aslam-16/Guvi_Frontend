
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import Signin from "./components/signin";
import Login from "./components/login"
import Home from './components/home';

function App() {
  return (
    
    <div>
      
      <Router>
        
         <Switch>
          <Route exact path="/">
            <Signin/></Route>
          <Route exact path="/login">
            <Login/></Route>
            <Route exact path="/home">
            <Home/></Route>
            </Switch>
  
    
    </Router>
    </div>

    
  );
}

export default App;
