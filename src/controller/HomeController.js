import React,{useEffect,useState} from 'react';
import Axios from 'axios';//this package needs to be installed
import Home from '../view/Home';


export default function HomeController(){


    //this is our controller and will be making api Requests to work as a model
    //so connecting to the database Is a Data model in this controller

    //Remember here we only call one View component to recieve data in state as props 
    //and this is at the end of this function when you scroll down  

    //let’s initialize our state. It is quite simple:
    const [data, setData] = useState({users: []});
    const [Editdata, setEditData] = useState([]);
    const [IsLoading, setIsLoading] = useState(false);
    const [ResponseMessage, setResponseMessage] = useState("");
  //  const [Userscounter, setUsersCounter] = useState(0);

    //We will use the useEffect hook to call this function when the HomeController component mounts.
  /*  useEffect runs after the component is rendered. Adding the empty brackets [ ] as
     an argument is necessary so the code doesn’t run in an infinite loop. This second
      argument tells useEffect to only render if certain values have changed.
     We’re essentially telling useEffect to only run on render, because we’re passing it an empty value
     */
    useEffect(()=>{

        getAllUsers_Model();


/*
Server sent events are realtime events sent from the server to the client.
 It's a way to subscribe to a data stream sent by a server.
EventSource API, which is a standard interface to interact with the Server-Sent Events
 protocol. It basically opens a persistent connection to our HTTP server. The cool thing about
  the API is that it keeps the connection open until we call EventSource.close():


let eventSource = new EventSource("http://localhost/api-phpreact/notifications/notifier.php")
    eventSource.onmessage = e =>{ 
  
        var returneddata = JSON.parse(e.data);
        console.log(returneddata);
        //the data to the state
        setUsersCounter(returneddata.TotalFound);
         //you can also call a function and pass in the data like below
        //eventSource.onmessage = e => updateUserList(JSON.parse(e.data))
     // eventSource.close();
    }
    */
      
    },[]);


    /*
    const updateUserList = (user) => {
        //modify your state
        setData([...product])
      }
*/


    // each request here will be stored in a function

    const getAllUsers_Model=async()=>{

            setData({users: data.users});
            setIsLoading(true);
    await Axios.get('http://localhost/api-phpreact/usersgender/gendermanagement.php')
    .then((response)=>{
     
          //  console.log(response.data);
// Now all we have to do is add the data we’ve retrieved from our GET request to the `getUsers` in our state
 
         //   our data is safely in our state object, and ready to be passed to a HomeController
         setData({users: response.data});
         setIsLoading(false);

        })
        .catch(error=>{
            setIsLoading(false);
            console.log(error);
            setData({users: data.users});
        })
        
    

    }



    const handleCreateuser=async(newuser)=>{
        setIsLoading(true);
        setResponseMessage("");
        let respons ="";

        const config = {
            headers: {
              "content-type": "multipart/form-data"
            }
          };

        console.log(newuser);
  await Axios.post('http://localhost/api-phpreact/usersgender/gendermanagement.php',{
            id:0,
            name:newuser.name,
            age:newuser.age,
            file:newuser.file,
            isEditing:'false'
            
        })
        .then(function(response){
            if(response.data.status_message ==="User created Successfully."){
                respons= response.data.status_message;
              //  console.log(response.data.id);
                //modifying the state to add new data       
    setData({users:[{ id: response.data.id, name:newuser.name, age:newuser.age,file:newuser.file},...data.users]});
    setIsLoading(false);
    setResponseMessage(respons);      
}
else{
    setIsLoading(false);
    setResponseMessage(respons); 
            }
        }.bind(this))
        .catch(function(error){
            console.log(error);
            setIsLoading(false);
            setResponseMessage(respons); 
        });
        console.log(respons);
    return respons;
}

/*
UpdateUser_Model=()=>{



}
*/

const handleDeleteUser=async(id)=>{
    setIsLoading(true);
    setResponseMessage(""); 
    //here we are filtering out the specific data by id,
    // in doing this we are removing it from the data state
    let deleteUser =data.users.filter(user=>{
        return user.id !==id;
    });
    console.log(id);
    let respons="";
    await Axios.put('http://localhost/api-phpreact/usersgender/gendermanagement.php?deleteid='+id,{
        deleteid:id
    })
    .then(({data})=>{
        if(data.status_message ==="Delete successful."){
            respons=data.status_message;
//add data into the state without the deleted one, it's already deleted
setData({users: deleteUser, isFetching: false});
setIsLoading(false);
setResponseMessage(respons); 

        }
        else{
            setIsLoading(false);
            respons=data.status_message;
            setResponseMessage(respons); 
        }
    })
    .catch(error=>{
        setIsLoading(false);
        console.log(error);
        
    });
    console.log(respons);
   return respons;

}



    //when edit button pressed on a user from GetUsers component
//user is recieved from  GetUsers.js.js
const EditBtnPressed=(user)=>{
    //console.log(user);
        user.isEditing = true;
        //add data into the state for referncing purposes
    setEditData(user);
    setResponseMessage("Data is set for editting"); 
    
    }

//CANCEL EDIT MODE
const handleUpdateuser=async(user)=>{

    const config = {
        headers: {
          "content-type": "multipart/form-data"
        }
      };
    setIsLoading(true);
    let respons="";
    setResponseMessage(respons); 
   await Axios.put('http://localhost/api-phpreact/usersgender/gendermanagement.php?id='+user.id,
    {
            id:user.id,
            name:user.name,
            age:user.age,
            file:user.file,
            isEditing:'false'
    })
    .then((response)=>{
        if(response.data.status_message ==="update successful."){

            respons=response.data.status_message;

            let usersdata =data.users.map(userinfo=>{
                if(userinfo.id ===user.id){
                    userinfo.id =user.id;
                    userinfo.name =user.name;
                    userinfo.age =user.age;
                    userinfo.file =user.file;
                    userinfo.isEditing =false;
                    return userinfo;
                }
                return userinfo;
            });
        //update data into the state 
setData({users: usersdata});
//reseting data in  which was set for editting
setEditData("");
setIsLoading(false);
setResponseMessage(respons); 
        }
        else{
            respons=response.data.status_message;
            console.log(response.data.status_message);
            setIsLoading(false);
            setResponseMessage(respons); 
        }
    })
    .catch(error=>{
        console.log(error);
        setIsLoading(false);
    });
return respons;

    //user.isEditing=false;
   // user.id=0;
//add data into the state for referncing purposes
 //setEditData(user);
 console.log(user);
}


//and we will pass data to the Home view it the state as a prop.
//you can pass multiple data or functions
//for passing functions, we make sure there accessed  in our controller here so reference them
return <Home 
data={data} 
IsLoading={IsLoading}  
handleCreateuser={handleCreateuser} 
EditBtnPressed={EditBtnPressed}
Editdata={Editdata}
handleDeleteUser={handleDeleteUser} 
handleUpdateuser={handleUpdateuser} 
ResponseMessage={ResponseMessage}

/>;


}
