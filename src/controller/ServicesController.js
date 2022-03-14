import React,{useEffect,useState} from 'react';
import Axios from 'axios';//this package needs to be installed
import Services from '../view/Services';




export default function ServicesController (){

//this is our controller and will be making api Requests to work as a model
    //so connecting to the database Is a Data model in this controller

    //Remember here we only call one View component to recieve data in state as props 
    //and this is at the end of this function when you scroll down  




//and we can  pass data to the  view it the state as a prop.
return <Services />;


}