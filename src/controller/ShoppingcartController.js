import React,{useEffect,useState} from 'react';
import Axios from 'axios';//this package needs to be installed

import Shoppingcart from '../view/Shoppingcart';
import { Redirect } from 'react-router-dom';


export default function ShoppingcartController (){

//this is our controller and will be making api Requests to work as a model
    //so connecting to the database Is a Data model in this controller

    //Remember here we only call one View component to recieve data in state as props 
    //and this is at the end of this function when you scroll down  

   //let’s initialize our state. It is quite simple:
   const [CartData, setCartData] = useState([]);
   const [IsLoading, setIsLoading] = useState(false);

   useEffect(()=>{

    getCartItems_Model();


},[]);




    // each request here will be stored in a function

    const getCartItems_Model=()=>{

        setCartData(CartData);
        setIsLoading(true);

        let cart =  JSON.parse(localStorage.getItem('cart_items'));

        console.log(cart);
// Now all we have to do is add the data we’ve retrieved from our GET request to the `getUsers` in our state

     //   our data is safely in our state object, and ready to be passed to our view
     setCartData(cart);
     setIsLoading(false);
    
}



const RemoveItemFromCartBtnPressed=(cartItem)=>{

    setIsLoading(true);
  //here we are filtering out the specific CartData by id,
    // in doing this we are removing it from the CartData state and create new array copy
    let NewCartItems =CartData.filter(cartdata=>{
        return cartdata.productid !==cartItem.productid; //return items which does not have cartItem.productid 
    });

localStorage.setItem('cart_items', JSON.stringify(NewCartItems));
//console.log(cart);
setCartData(NewCartItems);
setIsLoading(false);

}


const EmptyCartBtnPressed=()=>{
    
    localStorage.removeItem('cart_items');
    setCartData([]);

    }


    
    

const IncreaseQTYBtnPressed=(cartItem)=>{  
//console.log(cartItem);
let cart = localStorage.getItem('cart_items') ? JSON.parse(localStorage.getItem('cart_items')) : [];

for (var i = 0; i < cart.length; i++) {
    var _cart = cart[i];
//here we find a match of products with same id and adjust it's quantity
//console.log(id +" == "+ _cart.productid);
    if (cartItem.productid === _cart.productid) {
        //splice replaces the existing array item with new quantity
        //item is already in a cart ,lets adjust it's quantity
        cart.splice(cart.indexOf(_cart),1,{
            productid: cartItem.productid,
            productname: cartItem.productname,
            price: cartItem.productid,
            quantity : _cart.quantity + 1
        });

    }

}//end the loop
//console.log(cart);
localStorage.setItem('cart_items', JSON.stringify(cart));
setCartData(cart);

}


const DecreaseQTYBtnPressed=(cartItem)=>{

//console.log(cartItem);
let cart = localStorage.getItem('cart_items') ? JSON.parse(localStorage.getItem('cart_items')) : [];
//let's not decrease the quantity , if quantity it's 1
if(cartItem.quantity >1){
for (var i = 0; i < cart.length; i++) {
    var _cart = cart[i];
//here we find a match of products with same id and adjust it's quantity
//console.log(id +" == "+ _cart.productid);
    if (cartItem.productid === _cart.productid) {
        //splice replaces the existing array item with new quantity
        //item is already in a cart ,lets adjust it's quantity
        cart.splice(cart.indexOf(_cart),1,{
            productid: cartItem.productid,
            productname: cartItem.productname,
            price: cartItem.productid,
            quantity : _cart.quantity - 1
        });

    }

}//end the loop
//console.log(cart);
localStorage.setItem('cart_items', JSON.stringify(cart));
setCartData(cart);
} 
}


//and we can  pass data to the  view it the state as a prop.
return <Shoppingcart
CartData={CartData} 
IsLoading={IsLoading}
RemoveItemFromCartBtnPressed={RemoveItemFromCartBtnPressed} 
EmptyCartBtnPressed={EmptyCartBtnPressed}
DecreaseQTYBtnPressed={DecreaseQTYBtnPressed}
IncreaseQTYBtnPressed={IncreaseQTYBtnPressed}
/>;


}