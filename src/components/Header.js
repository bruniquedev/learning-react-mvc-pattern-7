import React,{useEffect,useState} from 'react';
import { Link } from 'react-router-dom';

const Header = () => {

  const [Userscounter, setUsersCounter] = useState(0);
  const [Cartcounter, setCartCounter] = useState(0);
  //useEffect hook runs after the component is rendered.

  useEffect(()=>{

/*
Server sent events are realtime events sent from the server to the client.
It's a way to subscribe to a data stream sent by a server.
EventSource API, which is a standard interface to interact with the Server-Sent Events
protocol. It basically opens a persistent connection to our HTTP server. The cool thing about
the API is that it keeps the connection open until we call EventSource.close():
*/

let eventSource = new EventSource("http://localhost/api-phpreact/notifications/notifier.php")
eventSource.onmessage = e =>{ 

    var returneddata = JSON.parse(e.data);
    console.log(returneddata);
    //the data to the state
    setUsersCounter(returneddata.TotalFound);
     //you can also call a function and pass in the data like below
    //eventSource.onmessage = e => updateUserList(JSON.parse(e.data))
 // eventSource.close();

 //since this server sent event is running forever, i call my local storage  and convert it
 // to json array and then i set to the state
 /*setCartCounter(0);
 let cart =  JSON.parse(localStorage.getItem('cart_items'));
 if(cart!==null){

 setCartCounter(cart.length);
 }*/

}


  
},[]);

let cart =  JSON.parse(localStorage.getItem('cart_items'));
let cartcount =0;
if(cart!==null){
  cartcount = cart.length;
}

    return (
        <header>

<nav class="navbar navbar-expand-lg navbar-light bg-light fixed-to">
  <div class="container-fluid">
    <a class="navbar-brand" href="#">Navbar</a>
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarSupportedContent">
      <ul class="navbar-nav me-auto mb-2 mb-lg-0">
        <li class="nav-item">
          <Link class="nav-link active" aria-current="page" to="/"><i class='ion ion-ios-home'></i>Home 
           <span class="badge badge-danger">{Userscounter}</span></Link>
        </li>
        <li class="nav-item">
          <Link class="nav-link" to="/about"><i class='ion ion-ios-list-outline'></i> About</Link>
        </li>

        <li class="nav-item">
          <Link class="nav-link" to="/services"><i class='ion ion-ios-briefcase'></i> Services</Link>
        </li>

        <li class="nav-item">
          <Link class="nav-link" to="/ecommerce"><i class='ion ion-ios-list-outline'></i> Ecommerce</Link>
        </li>

        <li class="nav-item">
          <Link class="nav-link"  to="/shoppingcart"> <i class='ion ion-android-cart'></i> Shopping cart 
              <span id="cartbadge" class="badge badge-danger">{cartcount}</span></Link>
        </li>

        
      </ul>
    
    </div>
  </div>
</nav>


           
        </header>
    );
};

export default Header;