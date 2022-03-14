import React,{Component} from 'react';
import Showproducts from '../components/EcommerceComponents/Showproducts';

export default function  Ecommerce(props) {

   
    console.log(props);
    const  DiplayEcomerce=(props)=>{
 
        return(
        
            <div>
            <div className="container heading1">
            <h1>Our shop</h1>

<div class="container">
<div class="row">
<Showproducts 
all_products={props.ProductsData} 
    IsLoading={props.IsLoading}
    AddToCartBtnPressed={props.AddToCartBtnPressed}
    />

</div>
</div>
        

            </div>
            </div>
        
        );
    }


    return(
        DiplayEcomerce(props)
        );
        
        }