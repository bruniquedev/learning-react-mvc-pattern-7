import React from 'react';
import { Link } from 'react-router-dom';
import Loader from '../Loader';
export default function Showproducts(props){


    const DisplayProducts=(props)=>{
       const listOfproducts=props.all_products.products;
     let maindata="";
     let urlToImage="http://localhost/api-phpreact/photos/";
       //console.log(props);
        //we create a list to loop through the array such that we get each data for rendering 
        let productsList =  listOfproducts.map((product,index)=>{
              //remember PressEditBtn and PressDelete performs an action by means of props 
              return(  
<div class="col-xs-18 col-sm-6 col-md-3">
<div class="thumbnail">
        <img  src={urlToImage + product.id+".jpg"} width="100%" height="100%" />
        <div class="caption">
        <h4>{product.name}</h4>
        <p>Product age : {product.age}</p>
        <p><strong>Price: </strong>{product.id}$</p>
        <p class="btn-holder">
          <button onClick={()=>props.AddToCartBtnPressed(product)} class="btn btn-warning btn-block text-center"
         role="button">Add to cart</button>  {/*onClick={()=>props.EditBtnPressed(user)}*/}</p>
        </div>
        </div>
        </div>

              );

        });

      
          //lets add the loader
   
       if(props.IsLoading===false){
         
           maindata = productsList;
       }else{
        maindata =<div className='col-12'><Loader /></div>
       }
       
       return(
        maindata
       );

    }


    return(
        
        DisplayProducts(props)
        );


}

