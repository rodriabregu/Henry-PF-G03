import Landing from './Components/LandingPage/LandingPage';
import Home from './Components/Home/Home';
import NavBar from './Components/NavBar/NavBar';
import Footer from './Components/Footer/Footer';
import ProductDetail from './Components/ProductDetail';
import CreateProducts from './Components/Products/createNewProducts';
import Cart from './Components/Cart';
import Login from './Components/LogIn';
import Logout from './Components/LogOut';
import NoAuth from './Components/NoAuth'
import CreateCategory from './Components/Categories/createCategory'
import SalesList from './Components/Sales';
import SaleDetail from './Components/Sales/saleDetail';
import PostSale from './Components/Sales/PostSale';
import AdminDash from './Components/Dashboard/';
import Faq from './Components/FAQ/faq';
import ContactUs from './Components/ContactUs/ContactUs';
import AboutUs from './Components/AboutUs/AboutUs';
import Favs from './Components/Favs/Favs'
import Destiny from './Components/Destiny/Destiny'
import Account from './Components/Account';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { useAuth0 } from "@auth0/auth0-react";
import './App.css';


function App() {
  const { isAuthenticated } = useAuth0<{ isAuthenticated: boolean }>(); 

  if(isAuthenticated) {
  return (
      <Router>
        <div className="App">
          <Route path="/" component={NavBar} />
          <Route exact path="/" component={Landing} />
          <Route exact path="/adashboard" component={AdminDash} />
          <Route exact path="/cart" component={Cart} />
          <Route exact path="/home" component={Home} />
          <Route exact path="/product/:id" component={ProductDetail} />
          <Route exact path='/logout' component={Logout} />
          <Route exact path='/create' component={CreateProducts} />
          <Route exact path='/createCategory' component={CreateCategory}/>
          <Route exact path='/allSales' component={SalesList}/>
          <Route exact path='/sales/:id' component={SaleDetail}/>
          <Route exact path='/FAQ' component={Faq}/>
          <Route exact path='/ContactUs' component={ContactUs}/>
          <Route exact path='/AboutUs' component={AboutUs}/>
          <Route exact path='/favs' component={Favs}/>
          <Route exact path='/account' component={Account}/>
          <Route path="/checkout/:saleId/:esta" component={PostSale} />          
          <Route path="/" component={Footer} />
          
        </div>
      </Router>
  );
  } else {
    return (
        <Router>
          <div className="App">
            <Route path="/" component={NavBar} />
            <Route exact path="/" component={Landing} />
            <Route exact path="/adashboard" component={NoAuth} />
            <Route exact path="/cart" component={Cart} />
            <Route exact path="/home" component={Home} />
            <Route exact path="/product/:id" component={ProductDetail} />
            <Route exact path='/login' component={Login} />
            <Route exact path='/logout' component={Home} />
            <Route exact path='/register' component={Login} />
            <Route exact path='/create' component={NoAuth} />
            <Route exact path='/createCategory' component={NoAuth}/>
            <Route exact path='/allSales' component={NoAuth}/>
            <Route exact path='/sales/:id' component={NoAuth}/>
            <Route exact path='/FAQ' component={Faq}/>
            <Route exact path='/ContactUs' component={ContactUs}/>
            <Route exact path='/AboutUs' component={AboutUs}/>
            <Route exact path='/account' component={Login}/>
            <Route path="/checkout/:saleId/:esta" component={NoAuth} />
            <Route path='/destiny' component={Destiny}/>
            <Route path="/" component={Footer} />
          </div>
        </Router>
    )
  };
};

export default App;