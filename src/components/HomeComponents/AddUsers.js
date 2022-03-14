import React,{ useState,useRef   } from 'react';
import icon_pic from "../../Assets/images/placeholder.png";

export default function AddUsers(props){

//using the React hook useState. In this example I will be using useState.
//Here, we are setting the default value to an object with the keys
/*Here we’re setting up a variable for our state ‘formData’ 
and we are setting up a function that lets us change the values in formData, ‘setFormData.’
 */

const [formData , setformData] = useState('');
const [image, setImage] = useState(icon_pic)
/*
//useRef returns a mutable ref object whose .current property is initialized
 to the passed argument (initialValue). 
//The returned object will persist for the full lifetime of the component.
*/
const nameinputRef = useRef(null);// will help in editting purposes
const ageinputRef = useRef(null);// will help in editting purposes
const idinputRef = useRef(null);// will help in editting purposes

   const handleSubmit = (e) => {
        e.preventDefault();
        //we have got this event method by means of props from Home.js
       
        /*
        //this method helps in getting data from the form using on submit event
        const data = new FormData(e.target);
        // Access FormData fields with `data.get(fieldName)`
        // For example, converting to upper case
      //  data.set('username', data.get('username').toUpperCase());
      console.log(data.get("age"));
      */
        console.log(formData);
    
     console.log("supposed to be reset")
        document.getElementById("users-form").reset(); 
      //console.log(response);
        e.target.reset();
        //reset image state to default
        setImage(icon_pic);
    }

    const handlecancelEdit = (e) => {
        window.location.reload(false);
      // document.getElementById("users-form").reset();
       //setformData("");
      // form.reset();
      console.log("reset form");
    }


    // update state
    //we update the state by property name
/*
Whenever you need to change values inside your state, you need to use the setFormData() function.
*/

  const  updateState = (e) => {
      //adds data into the state
      //this first method helps in adding data only into the object
   /*setformData({
        ...formData,
  
        // Trimming any whitespace
        [e.target.name]: e.target.value.trim()
      });
         */
        //this second method helps in adding and editting data  into the object
        //get data by refs
      var refname= nameinputRef.current.value;
     var refage= ageinputRef.current.value;
     var refid= idinputRef.current.value;
     //add data into the sate

//checking for empty image string
let image_path = "";
if(image_path.startsWith("data:")){
  image_path=image;//equal to image selected state
}

     setformData({
        name: refname,
        age: refage,
        id: refid,
        file: image_path
      });
     console.log(formData);


    }

    const readImageURLFromDisk =(event) => {
      if (event.target.files && event.target.files[0]) {
        let reader = new FileReader();
        let file = event.target.files[0];

        reader.onload = (event)=> {
console.log(event.target.result);
//add image local url into the state to change img src
setImage(event.target.result);

//for editting purposes or saving data purposes get values from the fields
var refname= nameinputRef.current.value;
var refage= ageinputRef.current.value;
var refid= idinputRef.current.value;

setformData({
          ...formData,
          name: refname,
          age: refage,
          id: refid,
          file: event.target.result
        });
    }
    reader.readAsDataURL(file);
    console.log(formData);
    //console.log(file);
  }
  }


    
 
    
    const AddOrEditUsers=(props)=>{
      
        
    let btn =  <button type="submit"  className="btn btn-primary blue" onClick={()=>props.handleCreateuser(formData)} >Add +</button>  
                
           if(props.DataToEdit.id > 0 && props.DataToEdit.isEditing===true){
    btn =<div>
        <button type="submit"  className="btn btn-primary blue" onClick={()=>props.handleUpdateuser(formData)} >Update</button>
           &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        <button type="button"  className="btn btn-primary blue" onClick={handlecancelEdit} >Cancel edit</button>
    </div>
            }

            return (
         //onSubmit={handleSubmit} 
 <div>  
 <h3 className='text-center'>{props.ResponseMessage}</h3>    
<form  onSubmit={handleSubmit} id="users-form">
{/*console.log(props)*/}
<div className="mb-3 input-field">
<label for="exampleFormControlInput1" class="form-label">Your name</label>
<input name="name"  defaultValue={props.DataToEdit.name} ref={nameinputRef}
class="form-control" autoComplete="off" placeholder="Enter your name" required type="text"
onChange={updateState} />
{console.log("re rendering")}
</div>

<div className="mb-3 input-field">
<label for="exampleFormControlInput1" class="form-label">Your age</label>
<input name="age" defaultValue={props.DataToEdit.age} ref={ageinputRef}  class="form-control" autoComplete="off" type="number" required placeholder="Enter your age" 
onChange={updateState } />
</div>


<div class="form-group col-md-12">
      <label for="inputState">Add image</label>
<div id="icons-inputPhoto" class="file-inputPhoto file-upload-inputPhoto">
      <label for="input_photo">{/*<!--- important for browsing file  label for and input file id should match  --->*/}
        <i class="ion-android-camera"></i>Select photo
      </label>
      <input id="input_photo" name="input_photo" type="file" 
      onChange={(e) => readImageURLFromDisk(e)}/>
    </div>
    <img id="image_photo" name="image_photo" style={{width:"50px", height:"100%"}} 
    src={image} alt="file_photo" />
    </div>


<div className="mb-3 input-field">
<label for="exampleFormControlInput1" class="form-label">ID</label>
<input name="id" defaultValue={props.DataToEdit.id} ref={idinputRef}  class="form-control" autoComplete="off" type="number"  placeholder="id" 
onChange={updateState } readOnly/>
</div>

<div className="input-field col s2">
    {btn}
</div>
</form>
</div>
);
            
    }


        return(
            AddOrEditUsers(props)
            );  

    
}
