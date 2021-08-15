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
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import axios from 'axios'

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
          <Route path="/" component={Footer} />
          <Route path="/checkout/:saleId/:esta" component={(props: any)=>{
            
            const {saleId,esta} = props.match.params
            const {search} = props.location
            
            let saleState: string = ""

            axios.put(`http://localhost:3001/sale`+search, {saleId})
            .then(res => {
              saleState = res.data.data.state
              console.log(saleState)
          })     
           return(<div>
                <h1>saleId: {saleId}</h1>
                <h1>saleState: {saleState}</h1>
                <p>search: {search}</p>
            </div>)
          }} />
        </div>
      </Switch>
    </Router>
  );
};

export default App;