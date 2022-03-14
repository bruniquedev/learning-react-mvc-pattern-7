import React from 'react';//in order for us to create a component, first we import react
import Footer from '../components/Footer';
import Header from '../components/Header';
function Detailspage(props){
    //getig data referenced in this detail page
    console.log(props);
return(

    <div>
    <div className="container heading1">
    <h1 className="heading1">Details page here</h1>
<h3 className="heading1">Name : {props.match.params.name}</h3>
    <h3 className="heading1">Age : {props.match.params.age}</h3>
    <h3 className="heading1">Id : {props.match.params.id}</h3>
    </div>
    </div>

)


}


export default Detailspage;