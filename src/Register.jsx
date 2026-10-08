import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Register(){
      const navigate=useNavigate();
      const [registerUser,setRegisterUser] = useState({
            name:"",
            role:"",
            email:"",
            password:""
      });
      function handleChange(e){
            setRegisterUser({
                  ...registerUser,
                  [e.target.name]:e.target.value
            });
      }
      async function register(){
            try{
                  await axios.post("http://localhost:8080/employee/register",registerUser);

                  alert("Registration Successfull");
                  navigate("/");
            }catch(err){
                  alert("Registration Failed!");
            }
      }
      return(
            <>
                  <h2>Register Here</h2>
                  <input type="text"
                  name="name"
                  placeholder="Enter your name"
                  onChange={handleChange}/>
                  
                  <input type="text"
                  name="role"
                  placeholder="Enter your role"
                  onChange={handleChange}/>

                  <input type="email"
                  name="email"
                  placeholder="Enter your email"
                  onChange={handleChange}/>
                  
                  <input type="password"
                  name="password"
                  placeholder="Enter your password"
                  onChange={handleChange}/>

                  <button onClick={register}>Register</button>
                  <a href="/">Already have account?</a>
            </>
      );
}
export default Register