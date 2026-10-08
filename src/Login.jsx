import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login(){
      const navigate = useNavigate();
      const [loginUser,setLoginUser] = useState({
            email:"",
            password:""
      });
      function handleChange(e){
            setLoginUser({
                  ...loginUser,
                  [e.target.name]:e.target.value
            })
      }
      async function submit(){
            try{
                  const response = await axios.post("http://localhost:8080/employee/login",loginUser)
                  console.log(response.data);

                  localStorage.setItem("token",response.data.token);
                  
                  alert("Login Successfull");
                  navigate("/home");
            }catch(err){
                  alert("Login Failed");
            }
      }
      return(
            <>
                  <h1>Login Page</h1>
                  <input
                  type="email"
                  name="email"
                  placeholder="Enter your email"
                  onChange={handleChange}
                  />
                  <input
                  type="password"
                  name="password"
                  placeholder="Enter your password"
                  onChange={handleChange}
                  />
                  <button onClick={submit}>Login</button>
                  <a href="/register">New user?</a>
            </>
      );
}
export default Login