import React,{Component} from 'react';
import { Redirect } from 'react-router-dom';
import ShowShoppingcart from '../components/EcommerceComponents/ShowShoppingcart';

export default function  Ecommerce(props) {

   
    console.log(props);
    const  DiplayShoppingCart=(props)=>{
 
         if(props.CartData===null){
       return <Redirect to="/ecommerce" />
         }
        return(

        
        
            <div>
            <div className="container heading1">
            <h1>Shopping cart ({props.CartData.length})</h1>

<div class="container">
<div class="row">
<ShowShoppingcart 
CartData={props.CartData} 
    IsLoading={props.IsLoading}
    RemoveItemFromCartBtnPressed={props.RemoveItemFromCartBtnPressed}
    EmptyCartBtnPressed={props.EmptyCartBtnPressed}
    DecreaseQTYBtnPressed={props.DecreaseQTYBtnPressed}
IncreaseQTYBtnPressed={props.IncreaseQTYBtnPressed}
    
    
    />

</div>
</div>
        

            </div>
            </div>
        
        );
    }


    return(
        DiplayShoppingCart(props)
        );
        
        }