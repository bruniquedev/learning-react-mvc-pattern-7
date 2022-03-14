import React,{Component} from 'react';
import AddUsers from '../components/HomeComponents/AddUsers';
import GetUsers from '../components/HomeComponents/GetUsers';

//import $ from '../Assets/js/jquery.js';
export default function Home(props){

   // console.log(props.data);
   console.log(props);
  const  DiplayHome=(props)=>{
 
   // console.log(props.isFetching);
    
        return(

            <div>
          
            <div className="container heading1">
            <h1>MVC pattern example of create, update, delete (CRUD) Server sent events on badge</h1>

            <div class="row">
    <div class="col-5">
      {/*Note that EditBtnPressed function is created in AddUsers component */}
    <AddUsers  handleCreateuser={props.handleCreateuser}
               DataToEdit={props.Editdata} 
               handleUpdateuser={props.handleUpdateuser}
               IsLoading={props.IsLoading}
               ResponseMessage={props.ResponseMessage}
               />
    </div>
    <div class="col-7">


{/* commenting out works this way  {/* Your Code */} 

  <GetUsers   all_users={props.data} 
  handleDeleteUser={props.handleDeleteUser}
  EditBtnPressed={props.EditBtnPressed} 
  IsLoading={props.IsLoading}/>
    </div>
 
  </div>



 

        

            </div>
         
            </div>
        
        );
        }


        return(
            DiplayHome(props)
            );
        
        }   