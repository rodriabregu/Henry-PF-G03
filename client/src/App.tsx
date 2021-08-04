import './App.css';
import Home from './Components/Home/Home';
import NavBar from './Components/NavBar/NavBar';
import Footer from './Components/Footer/Footer';
import {BrowserRouter as Router,
  Switch,
  Route,} from 'react-router-dom'


function App() {
  return (
    <Router>
      <Switch>
        <div className="App">
          <Route path="/" component={NavBar} />
          <Route exact path="/home" component={Home} />
          <Route path="/" component={Footer} />
        </div>
      </Switch>
    </Router>
  );
}

export default App;
