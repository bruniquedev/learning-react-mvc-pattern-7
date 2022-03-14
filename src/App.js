import React from 'react';

import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import HomeController from './controller/HomeController';
import AboutController from './controller/AboutController';
import ServicesController from './controller/ServicesController';
import EcommerceController from './controller/EcommerceController';
import ShoppingcartController from './controller/ShoppingcartController';
import Detailspage from './view/Detailspage';
import Header from './components/Header';
import Footer from './components/Footer';
import  './Assets/css/style.css';
import  './Assets/ionicons/css/ionicons.min.css';


function App() {

  
  return (
    <div>
      <Router>
        {/*Add your header and footer component  here at once*/}
      <Header/>
                <Switch>
                <Route path="/" exact component={HomeController} />
                <Route path="/about" exact component={AboutController} />
                <Route path="/services" exact component={ServicesController} />
                <Route path="/ecommerce" exact component={EcommerceController} />
                <Route path="/shoppingcart" exact component={ShoppingcartController} />
                <Route path="/detailspage/:name/:age/:id"  component={Detailspage} />
                </Switch>
  <Footer />  
                </Router>

</div>
  );
}

export default App;
