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
          <Route path="/checkout/:saleId/:accion" component={(props: any)=>{
            const {saleId} = props.match.params
            const {search} = props.location

            let status = /&status=[a-z]+&/ig.exec(search)
            let newState: string = ""
            if(status){
              newState = status[0]
              .replace("&status=","")
              .replace("&","")
              
              if(newState === "approved") newState = "Create"
              else newState = "Cancelled"
            }

            let preference = /preference_id=[\w\-]+&/ig.exec(search)
            let preference_id: string = ""
            if(preference){
              preference_id = preference[0]
              .replace("preference_id=","")
              .replace("&","")
            }   
            

            console.log("query: ",props)
            return(<div>
                <h1>saleId: {saleId}</h1>
                <h1>status: {status}</h1>
                <h1>newState: {newState}</h1>
                <h1>preference_id: {preference_id}</h1>
                <p>search: {search}</p>
            </div>)
          }} />
        </div>
      </Switch>
    </Router>
  );
};

export default App;