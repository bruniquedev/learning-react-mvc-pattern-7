import React from 'react';
import { Link } from 'react-router-dom';
import Loader from '../Loader';
export default function ShowShoppingcart(props){


    

    const DisplayCart=(props)=>{
       const listOfItems=props.CartData;
     let maindata="";
     let urlToImage="http://localhost/api-phpreact/photos/";
     let total=0;
    
       //console.log(props);
        //we create a list to loop through the array such that we get each data for rendering 
        let cartList =  listOfItems.map((cart,index)=>{
              //remember PressEditBtn and PressDelete performs an action by means of props 

              total += cart.price * cart.quantity;
              return(  
                <tr>
                    <td data-th="Product">
                        <div class="row">
                            <div class="col-sm-3 hidden-xs">
                <img src={urlToImage + cart.productid+".jpg"} width="100%" height="100%" class="img-responsive"/></div>
                            <div class="col-sm-6">
                                <h4 class="nomargin">{cart.productname}</h4>
                            </div>
                        </div>
                    </td>
                    <td data-th="Price">{cart.price}</td>
                    <td data-th="Quantity">
                        {/*<input type="number" defaultValue={cart.quantity} class="form-control quantity" />*/}
                <button class="btn btn-info btn-sm" onClick={()=>props.DecreaseQTYBtnPressed(cart)}>
                    <i class="ion ion-ios-minus"></i></button>
                &nbsp;
                        <strong>{cart.quantity}</strong> 
                &nbsp;              
                <button class="btn btn-primary btn-sm" onClick={()=>props.IncreaseQTYBtnPressed(cart)}>
                    <i class="ion ion-plus"></i></button>        
                    </td>
                    <td data-th="Subtotal" class="text-center">{cart.price * cart.quantity}</td>
                    <td class="actions" data-th="">
       <button class="btn btn-info btn-sm update-cart" 
       data-id={cart.productid}><i class="ion ion-android-refresh"></i></button>
    &nbsp;&nbsp;&nbsp;&nbsp;
            <button class="btn btn-danger btn-sm remove-from-cart" 
            onClick={()=>props.RemoveItemFromCartBtnPressed(cart)}
            data-id={cart.productid}><i class="ion ion-ios-trash"></i></button>
                    </td>
                </tr>
 

              );

        });

      
          //lets add the loader
   
       if(props.IsLoading===false){
         
        maindata = <div class="col-xs-12 col-sm-12 col-md-12">
        <table id="cart" class="table table-hover table-condensed">
                <thead>
                <tr>
                    <th style={{width:"50%"}}>Product</th>
                    <th style={{width:"10%"}}>Price</th>
                    <th style={{width:"20%"}}>Quantity</th>
                    <th style={{width:"22%"}} class="text-center">Subtotal</th>
                    <th style={{width:"10%"}}></th>
                </tr>
                </thead>
                <tbody>
            { cartList }
            </tbody>
        <tfoot>
        <tr class="visible-xs">
            <td class="text-center"><strong>Total {total}</strong></td>
        </tr>
        <tr>
            <td><Link to="/ecommerce" class="btn btn-warning"><i class="fa fa-angle-left"></i> Continue Shopping</Link></td>
            <td colspan="2" class="hidden-xs"> <button class="btn btn-danger" 
            onClick={()=>props.EmptyCartBtnPressed()}><i class="ion ion-ios-trash"></i> Empty cart</button></td>
            <td class="hidden-xs text-center"><strong>Total {total}</strong></td>
        </tr>
        </tfoot>
    </table>
    </div>;

       }else{
        maindata =<div className='col-12'><Loader /></div>
       }
       
       return(
        maindata
       );

    }


    return(
        
        DisplayCart(props)
        );


}

