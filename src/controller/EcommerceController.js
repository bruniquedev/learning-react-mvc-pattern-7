import React,{useEffect,useState} from 'react';
import Axios from 'axios';//this package needs to be installed

import Ecommerce from '../view/Ecommerce';


export default function EcommerceController (){

//this is our controller and will be making api Requests to work as a model
    //so connecting to the database Is a Data model in this controller

    //Remember here we only call one View component to recieve data in state as props 
    //and this is at the end of this function when you scroll down  

   //let’s initialize our state. It is quite simple:
   const [ProductsData, setProductData] = useState({products: []});
   const [IsLoading, setIsLoading] = useState(false);

   useEffect(()=>{

    getAllProducts_Model();


},[]);




    // each request here will be stored in a function

    const getAllProducts_Model=async()=>{

        setProductData({products: ProductsData.products});
        setIsLoading(true);
await Axios.get('http://localhost/api-phpreact/usersgender/gendermanagement.php')
.then((response)=>{
 
        console.log(response.data);
// Now all we have to do is add the data we’ve retrieved from our GET request to the `getUsers` in our state

     //   our data is safely in our state object, and ready to be passed to a HomeController
     setProductData({products: response.data});
     setIsLoading(false);

    })
    .catch(error=>{
        setIsLoading(false);
        console.log(error);
        setProductData({products: ProductsData.products});
    })
    


}



const AddToCartBtnPressed=async(product)=>{

   /*
   The AddToCartBtnPressed method adds the given product to the cart which is an object stored
    in localStorage as a string using the JSON.stringify method. This method converts 
    the string back to object using the JSON.parse method or creates a new object if no 
    item is found. The product is then added, and the cart is saved back in localStorage.
    */
   let cart = localStorage.getItem('cart_items') ? JSON.parse(localStorage.getItem('cart_items')) : [];
/*
The statement above is a short hand decision maker for javascript and it means this
if  localStorage.getItem('cart_items') contain data/items =true
cart variable = JSON.parse(localStorage.getItem('cart_items'))  //items in array of object format
else  localStorage.getItem('cart_items') contain data/items =true
cart variable =[] //empty array format
*/
let id = product.id;//get the product id from the passed data (product)
let ProductWasfound = false;
//if the cart  is empty
if(cart.length <=0){
    //run if the cart  is empty
   // console.log("no product in the cart");

    //push or add this product into an array
    cart.push({
        productid: product.id,
        productname: product.name,
        price: product.id,
        quantity : 1
    });

}else{
//else the cart has one or more items we check if the product just added does not exists in our cart
//run if the cart has atleast one item in it
//looping through the cart such that we get a match of products with the same id
for (var i = 0; i < cart.length; i++) {
    var _cart = cart[i];
//here we find a match of products with same id and adjust it's quantity
//console.log(id +" == "+ _cart.productid);
    if (id === _cart.productid) {
        ProductWasfound = true;
        //splice replaces the existing array item with new quantity
        //item is already in a cart ,lets adjust it's quantity
        cart.splice(cart.indexOf(_cart),1,{
            productid: product.id,
            productname: product.name,
            price: product.id,
            quantity : _cart.quantity + 1
        });

    }

}//end the loop

//here if product was found false, we add the new product into the cart
if(ProductWasfound===false){
 //push or add this product into an array
 cart.push({
    productid: product.id,
    productname: product.name,
    price: product.id,
    quantity : 1
});
	
}




}//end else

localStorage.setItem('cart_items', JSON.stringify(cart));
console.log(cart);
document.getElementById('cartbadge').innerHTML=cart.length;
}










//and we can  pass data to the  view it the state as a prop.
return <Ecommerce
ProductsData={ProductsData} 
IsLoading={IsLoading} 
AddToCartBtnPressed={AddToCartBtnPressed} 
/>;


}