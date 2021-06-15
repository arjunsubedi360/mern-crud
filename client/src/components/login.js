import React, {useState} from 'react';
import {useHistory } from 'react-router-dom';

const Login = () => {
  
  const history = useHistory();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const loginUser = async (e) => {
    e.preventDefault();

    const res = await fetch('/signin',{
      
        method:"POST",
        headers:{
         "Content-Type": "application/json"
        }, body:JSON.stringify({
          email,
          password
        })
    });

    const data = res.json();

    if(res.status === 400 || !data){
      window.alert("Invalid Ceredentials");
    }else{
      window.alert("Login Succesfully");
      history.push("/");
    }
  }

  return (
  <>
    <div className="container-fluid mx-auto d-flex justify-content-center mt-5  ">
    <form  method= "POST" className="shadow p-3 mb-5 bg-body rounded bg-info">
  <div className="form-group">
    <label htmlFor="exampleInputEmail1">Email</label>
    <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" 
      
      name = "email"
      value = {email}
      onChange = {(e) => setEmail(e.target.value)}

      placeholder="Enter email"
    />
    <small id="emailHelp" className="form-text text-light">We'll never share your email with anyone else.</small>
  </div>

  
  <div className="form-group">
    <label htmlFor="password"> Password</label>
    <input type="password" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"
      
      name ="password"
      value = {password}
      onChange = {(e) => setPassword(e.target.value)}

     placeholder="Enter Password"/>
    
  </div>

 
  <div className="form-group form-button">
  <input type="submit" className="btn btn-success border border-light"
  value="Log In"
    
    name = "signin"
    onClick = {loginUser}
  />
  </div>
</form>
</div>
</>

  )
}

export default Login
