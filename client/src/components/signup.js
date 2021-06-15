import React, {useState} from 'react';
import {NavLink, useHistory} from "react-router-dom";
import "./signup.css";


// import {NavLink} from "react-router-dom";


const SignUp = () => {
  // Using history
  const history = useHistory();
//using hooks and state for fetching api 
  const [user, setUser] = useState({
    name:"", gender:"", email:"", phone:"", password:"" , cpassword:""
  });

  let name, value;

  const handleInputs =(e) => {

    console.log(e.target.name,e.target.value);
    name = e.target.name;
    value = e.target.value;

    setUser({...user, [name]:value});
  }

  const PostData = async(e) => {
    e.preventDefault();

    const {name, gender, email, phone, password} =user;
    const res =  await fetch("/register",{
      method:"POST",
      headers:{
       "Content-Type": "application/json"
      },
      body: JSON.stringify({
        name, gender, email, phone, password
      })
    });
    const data = await res.json();

    if(res.status === 422 || !data ){
      window.alert("Invalid Registration");
      console.log("Invalid Registration");
    }else{
      window.alert("Registration Successfull");
      console.log(" Registration Successfull");

      history.push("/login")
    }
  }

  return (
    <>
    <div className="container-fluid mx-auto d-flex justify-content-center mt-5 ">
    <form method="POST" className="shadow p-3 mb-5 bg-body rounded bg-info">
    
  <div className="form-group">
    <label htmlFor="name">Full Name</label>
    <input type="text" className="form-control"   id="name" autoComplete="off" 
    name="name"
    value={user.name}
    onChange ={handleInputs}
    
    placeholder="Enter Fullname"/>
  </div>

  <div className="form-group">
  <label htmlFor="gender">Gender</label>
   <select  className="form-control" id="gender" autoComplete="off" 
    
    name="gender"
    value={user.gender}
    onChange ={handleInputs}

   >
     <option>Male</option>
     <option>Female</option>
  </select>
  </div>

  <div className="form-group">
    <label htmlFor="email">Email</label>
    <input type="email" className="form-control"  id="email"  

    name="email"
    value={user.email}
    onChange ={handleInputs}

     placeholder="Enter email"/>
    <small  className="form-text text-light">We'll never share your email with anyone else.</small>
  </div>

  

  <div className="form-group">
    <label htmlFor="phone">Phone</label>
    <input type="number" className="form-control" id="phone"   autoComplete="off" 
    
    name="phone"
    value={user.phone}
    onChange ={handleInputs}

     placeholder="Phone Number"/>
    
  </div>
  <div className="form-group">
    <label htmlFor="password">Enter Password</label>
    <input type="password" className="form-control" id="password"  autoComplete="off" 
    
    name="password"
    value={user.password}
    onChange ={handleInputs}

     placeholder="Enter Password"/>
  </div>

  <div className="form-group">
    <label htmlFor="cpassword">Confirm Password</label>
    <input type="password" className="form-control" id="cpassword"  autoComplete="off" 

    name="cpassword"
    value={user.cpassword}
    onChange ={handleInputs}

     placeholder="Confirm Password"/>
  </div>
  
  <div className="form-group ">
     <input type="submit" name="signup" className="form-submit bg-success border border-light"
     value="Register" onClick={PostData} />

  </div>
  <div className="d-flex">
    <NavLink to="./login" className="text-light d-flex  border border-light bg-primary">Sign In </NavLink>
  </div>
</form>
</div>
    </>
  
  )
}

export default SignUp