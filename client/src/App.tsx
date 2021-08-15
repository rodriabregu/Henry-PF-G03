import './App.css';
import Landing from './Components/LandingPage/LandingPage';
import Home from './Components/Home/Home';
import NavBar from './Components/NavBar/NavBar';
import Footer from './Components/Footer/Footer';
import ProductDetail from './Components/ProductDetail';
import CreateProducts from './Components/Products/createNewProducts';
import Cart from './Components/Cart';
import Login from './Components/LogIn';
import Register from './Components/Register';
import CreateCategory from './Components/Categories/createCategory'
import SalesList from './Components/Sales';
import SaleDetail2 from './Components/Sales/saleDetail2';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

function App() {
  return (
    <Router>
      <Switch>
        <div className="App">
          <Route path="/" component={NavBar} />
          <Route exact path="/" component={Landing} />
          <Route exact path="/cart" component={Cart} />
          <Route exact path="/home" component={Home} />
          <Route exact path="/product/:id" component={ProductDetail} />
          <Route exact path='/login' component={Login} />
          <Route exact path='/register' component={Register} />
          <Route exact path='/create' component={CreateProducts} />
          <Route exact path='/createCategory' component={CreateCategory}/>
          <Route exact path='/allSales' component={SalesList}/>
          <Route exact path='/sales/:id' component={SaleDetail2}/>
          <Route path="/" component={Footer} />
        </div>
      </Switch>
    </Router>
  );
};

export default App;