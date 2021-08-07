import './App.css';
import Home from './Components/Home/Home';
import NavBar from './Components/NavBar/NavBar';
import Footer from './Components/Footer/Footer';
import ProductDetail from './Components/ProductDetail';
import Login from './Components/LogIn';
import Register from './Components/Register';
import { BrowserRouter as Router,
  Switch,
  Route } from 'react-router-dom'
import CreateProducts from './Components/Products/CreateProducts';


function App() {
  return (
    <Router>
      <Switch>
        <div className="App">
          <Route path="/" component={NavBar} />
          <Route exact path="/home" component={Home} />
          <Route exact path="/product/:id" component={ProductDetail} />
          <Route exact path='/login' component={Login} />
          <Route exact path='/register' component={Register} />
          <Route path="/" component={Footer} />
          <Route exact path='/create' component={CreateProducts} />
        </div>
      </Switch>
    </Router>
  );
};

export default App;