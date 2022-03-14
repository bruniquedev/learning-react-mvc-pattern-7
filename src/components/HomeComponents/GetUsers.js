import React,{Component } from 'react';
import { Link } from 'react-router-dom';
import Loader from '../Loader';

export default function GetUsers(props){

    //state is very important as whenever it changes, render method is called to render the html part or ui

//props are used for referencing data to another component
//so whenever i make an action props will reference whatever event, data and so on

   const DisplayUsers=(props)=>{
       const listOfUsers=props.all_users.users;
     let maindata="";
     let urlToImage="http://localhost/api-phpreact/photos/";
       //console.log(props);
        //we create a list to loop through the array such that we get each data for rendering 
        let usersList =  listOfUsers.map((user,index)=>{
              //remember PressEditBtn and PressDelete performs an action by means of props 
              return(  
              <tr key={index} >
                    <td>{user.id}</td>
                    <td><img id="image_photo" name="image_photo" 
                    style={{width:"100px", height:"100px", objectFit:'contain'}} 
                       src={urlToImage + user.id+".jpg"} alt="file_photo" /></td>
                    <td>{user.name}</td>
                    <td>{user.age}</td>
                    {/*EditBtnPressed is recieved from AddUsers component since we want to reuse the AddUsers
                    component for editting data without creating an extra form for ediiting purposes
                     handleDeleteUser is recieved from HomeController since it works with database  */}
    <td> <button className="btn  btn-primary" onClick={()=>props.EditBtnPressed(user)}> Edit </button> | 
         <button className="btn btn-danger" onClick={()=>props.handleDeleteUser(user.id)}> Delete </button> |
         <Link to={`/detailspage/${user.name}/${user.age}/${user.id}`}> Details </Link> |
         </td>
                </tr>
              );

        });

      
          //lets add the loader
   
       if(props.IsLoading===false){
         
           maindata =  
            <table className="table table-striped">
                <thead>
                    <tr>
                    <th>ID</th>
                    <th>Photo</th>
                    <th>Name</th>
                    <th>Age</th>
                    <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    
                    {/*out put the returned data here*/ usersList}
                </tbody>
            </table>
       }else{
        maindata =<Loader />
       }
       
       return(
        maindata
       );

    }


    return(
        
        DisplayUsers(props)
        );


}

